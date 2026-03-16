from flask import Flask, render_template, request, jsonify, session, redirect
import random
import string
import time
import os
import re

app = Flask(__name__)
app.secret_key = 'vaanipay_secret_key_2024'

# ─── IN-MEMORY DATA (resets when server restarts) ───────────────────────────
# For a real app you would use a database like SQLite or PostgreSQL
# For the hackathon, in-memory is perfectly fine

transactions = []   # list of all payments made
balance = 5000      # starting balance in rupees
otp_store = {}      # stores OTPs: { phone: { otp, time } }

# ─── LANGUAGE NAMES ──────────────────────────────────────────────────────────
LANGUAGES = {
    "hi-IN": "Hindi",
    "mr-IN": "Marathi",
    "gu-IN": "Gujarati",
    "pa-IN": "Punjabi",
    "or-IN": "Odia",
    "ml-IN": "Malayalam",
    "ta-IN": "Tamil",
    "te-IN": "Telugu",
    "bn-IN": "Bengali",
    "kn-IN": "Kannada",
    "en-IN": "English"
}


# ─── HELPER FUNCTIONS ────────────────────────────────────────────────────────

def make_txn_id():
    """Generate a random transaction ID like TXN4X9KL2M"""
    return 'TXN' + ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))

def generate_otp():
    """Generate a 4-digit OTP"""
    return ''.join(random.choices('0123456789', k=4))

def check_otp_valid(phone, entered_otp):
    """Check if the OTP entered is correct and not expired (5 min limit)"""
    stored = otp_store.get(phone)
    if not stored:
        return False
    if stored['otp'] != entered_otp:
        return False
    if time.time() - stored['time'] > 300:   # 300 seconds = 5 minutes
        return False
    return True


# ════════════════════════════════════════════════════════
#  STATIC FILE SERVING
#  Flask serves HTML from templates/ folder automatically
#  CSS, JS, images are served from static/ folder
# ════════════════════════════════════════════════════════

@app.route('/')
def home():
    """Serve the main landing page"""
    return render_template('index.html')

@app.route('/login')
def login_page():
    """Serve the login page"""
    return render_template('login.html')


# ════════════════════════════════════════════════════════
#  AUTH ROUTES
#  These handle login, OTP, logout
# ════════════════════════════════════════════════════════

@app.route('/api/login', methods=['POST'])
def login():
    """
    Step 1 of login: check phone number + PIN
    Frontend sends: { phone: "9876543210", pin: "1234" }
    Returns: success or error
    Demo PIN is always 1234
    """
    data  = request.json
    phone = data.get('phone', '').strip()
    pin   = data.get('pin', '').strip()

    # Validate inputs
    if not phone:
        return jsonify({'status': 'error', 'message': 'Phone number is required'})

    if pin == '1234':
        user_info = user_accounts.get(phone, {})
        session['user']         = phone
        session['user_name']    = user_info.get('name', 'VaaniPay User')
        session['balance']      = balance
        session['otp_verified'] = False
        return jsonify({'status': 'success', 'message': 'Login successful'})
    else:
        return jsonify({'status': 'error', 'message': 'Wrong PIN. Demo PIN is: 1234'})


@app.route('/api/send-otp', methods=['POST'])
def send_otp():
    """
    Generate OTP and "send" it (in demo mode, we just print it and return it)
    In production you would use Twilio or Fast2SMS to send a real SMS
    """
    data  = request.json
    phone = data.get('phone', session.get('user', ''))

    if not phone:
        return jsonify({'status': 'error', 'message': 'No phone number found'})

    # Generate and store OTP
    otp = generate_otp()
    otp_store[phone] = {'otp': otp, 'time': time.time()}

    # Print to terminal so you can see it during demo
    print(f'\n{"="*40}')
    print(f'  OTP for {phone}: {otp}')
    print(f'{"="*40}\n')

    return jsonify({
        'status': 'success',
        'message': f'OTP sent to {phone}',
        'debug_otp': otp   # ← shown on screen in demo mode, remove in production
    })


@app.route('/api/verify-otp', methods=['POST'])
def verify_otp():
    """
    Step 2 of login: verify the OTP entered by user
    Frontend sends: { phone: "9876543210", otp: "1234" }
    """
    data  = request.json
    phone = data.get('phone', session.get('user', ''))
    otp   = data.get('otp', '').strip()

    if check_otp_valid(phone, otp):
        session['otp_verified'] = True
        return jsonify({'status': 'success', 'message': 'OTP verified! Welcome to VaaniPay.'})
    else:
        return jsonify({'status': 'error', 'message': 'Wrong OTP. Please try again.'})


@app.route('/api/resend-otp', methods=['POST'])
def resend_otp():
    """Generate a new OTP (user clicked Resend)"""
    data  = request.json
    phone = data.get('phone', session.get('user', ''))

    # Delete old OTP
    if phone in otp_store:
        del otp_store[phone]

    # Generate new one
    otp = generate_otp()
    otp_store[phone] = {'otp': otp, 'time': time.time()}

    print(f'\n  NEW OTP for {phone}: {otp}\n')

    return jsonify({'status': 'success', 'message': 'New OTP sent', 'debug_otp': otp})


@app.route('/api/logout', methods=['POST'])
def logout():
    """Clear the session"""
    session.clear()
    return jsonify({'status': 'success', 'message': 'Logged out'})


# ════════════════════════════════════════════════════════
#  PAYMENT ROUTES
#  The core of VaaniPay — actually send money
# ════════════════════════════════════════════════════════

@app.route('/api/pay', methods=['POST'])
def pay():
    """
    Process a payment.
    Frontend sends: { to: "Ramesh", amount: 500, language: "hi-IN" }
    Returns: success with txn_id, or error
    """
    global balance, transactions

    data     = request.json
    amount   = int(data.get('amount', 0))
    receiver = data.get('to', 'Unknown')
    lang     = data.get('language', 'hi-IN')
    offline  = data.get('offline', False)

    # Offline mode — just queue it, don't process
    if offline:
        txn_id = make_txn_id()
        return jsonify({
            'status': 'queued',
            'txn_id': txn_id,
            'message': f'Payment queued: ₹{amount} to {receiver}'
        })

    # Validate amount
    if amount <= 0:
        return jsonify({'status': 'error', 'message': 'Amount must be greater than 0'})

    # Check sufficient balance
    if amount > balance:
        return jsonify({
            'status': 'error',
            'message': f'Insufficient balance. You have ₹{balance} available.'
        })

    # Determine risk level
    if amount > 10000:
        risk = 'HIGH RISK'
    elif amount > 1000:
        risk = 'MEDIUM RISK'
    else:
        risk = 'LOW RISK'

    # Deduct from balance
    balance -= amount

    # Create transaction record
    txn_id = make_txn_id()
    txn = {
        'id':       txn_id,
        'amount':   amount,
        'to':       receiver,
        'risk':     risk,
        'language': LANGUAGES.get(lang, lang),
        'time':     time.strftime('%I:%M %p'),
        'date':     time.strftime('%d %b %Y'),
        'type':     'sent',
        'status':   'completed',
    }
    transactions.append(txn)
    session['balance'] = balance

    print(f'\n  PAYMENT: ₹{amount} → {receiver} | TXN: {txn_id} | Balance: ₹{balance}\n')

    return jsonify({
        'status':      'success',
        'txn_id':      txn_id,
        'amount':      amount,
        'to':          receiver,
        'risk':        risk,
        'new_balance': balance,
        'message':     f'₹{amount} sent to {receiver} successfully!'
    })


@app.route('/api/balance', methods=['GET'])
def get_balance():
    """Return the current balance and logged-in user"""
    return jsonify({
        'balance': session.get('balance', balance),
        'user':    session.get('user', 'Guest')
    })


@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    """Return the last 10 transactions"""
    return jsonify({'transactions': transactions[-10:]})


@app.route('/api/sync', methods=['POST'])
def sync_offline():
    """
    Process payments that were saved offline.
    Frontend sends: { pending: [ {to, amount, language}, ... ] }
    """
    global balance
    data    = request.json
    pending = data.get('pending', [])

    synced = []
    count  = 0

    for txn in pending:
        amt      = int(txn.get('amount', 0))
        receiver = txn.get('to', 'Unknown')
        lang     = txn.get('language', 'hi-IN')

        if amt > 0 and amt <= balance:
            balance -= amt
            txn_id   = make_txn_id()
            synced.append({
                'id':     txn_id,
                'amount': amt,
                'to':     receiver,
                'status': 'success'
            })
            transactions.append({
                'id':       txn_id,
                'amount':   amt,
                'to':       receiver,
                'risk':     'LOW RISK',
                'language': LANGUAGES.get(lang, lang),
                'time':     time.strftime('%I:%M %p'),
                'date':     time.strftime('%d %b %Y'),
                'type':     'sent',
                'status':   'completed',
            })
            count += 1

    session['balance'] = balance

    return jsonify({
        'status':  'success',
        'count':   count,
        'synced':  synced,
        'message': f'{count} offline payment(s) synced successfully'
    })


# ════════════════════════════════════════════════════════
#  VOICE PARSING
#  Converts spoken text to structured payment data
# ════════════════════════════════════════════════════════

# @app.route('/api/voice-parse', methods=['POST'])
# def voice_parse():
#     """
#     Parse a voice command like "send 200 rupees to Ramesh"
#     Frontend sends: { command: "send 200 to ramesh", language: "hi-IN" }
#     Returns: { amount: 200, to: "Ramesh", parsed: "Send ₹200 to Ramesh" }
#     """
#     data    = request.json
#     command = data.get('command', '').lower().strip()

#     # Find numbers in the command
#     nums   = re.findall(r'\d+', command)
#     amount = int(nums[0]) if nums else None

#     # Find the recipient name
#     name = None

#     # English pattern: "send X to NAME"
#     if ' to ' in command:
#         after_to = command.split(' to ')[1].strip()
#         name = after_to.split(' ')[0]   # take first word after "to"

#     # Hindi pattern: "NAME ko X bhejo" or "X rupaye NAME ko do"
#     elif ' ko ' in command:
#         before_ko = command.split(' ko ')[0].strip()
#         words = re.sub(r'[0-9]', '', before_ko)
#         words = words.replace('send', '').replace('bhejo', '').replace('rupaye', '').strip().split()
#         if words:
#             name = words[-1]

#     # Capitalize name
#     if name:
#         name = name.strip().capitalize()

#     # Build response
#     if amount and name:
#         parsed_text = f'Send ₹{amount} to {name}'
#     elif amount:
#         parsed_text = f'Send ₹{amount} (recipient not found)'
#     elif name:
#         parsed_text = f'Send to {name} (amount not found)'
#     else:
#         parsed_text = 'Could not understand command. Try: "Send 200 to Ramesh"'

#     return jsonify({
#         'status': 'success',
#         'amount': amount,
#         'to':     name,
#         'parsed': parsed_text
#     })


@app.route('/api/voice-parse', methods=['POST'])
def voice_parse():
    data    = request.json
    command = data.get('command', '').strip()
    lower   = command.lower()

    # Step 1 — find number
    nums   = re.findall(r'\d+', lower)
    amount = int(nums[0]) if nums else None

    # Step 2 — multilingual recipient patterns
    name = None

    # Common connector words across supported languages
    to_words = [
        'to', 'ko', 'को', 'কে', 'க்கு', 'కు', 'ಗೆ', 'ને', 'ਨੂੰ', 'କୁ', 'کے'
    ]

    # Try: connector + name, e.g. "to ramesh", "को रमेश"
    for word in to_words:
        pattern = r'(?:\b|\s)' + re.escape(word) + r'(?:\b|\s)+([\w\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F]+(?:\s+[\w\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F]+)?)'
        m = re.search(pattern, lower)
        if m:
            raw = m.group(1).strip()
            raw = re.sub(r'\b(please|now|ji|bhai|didi|sir|madam)\b', '', raw, flags=re.IGNORECASE).strip()
            if raw:
                name = ' '.join([w.capitalize() for w in raw.split()[:2]])
                break

    # Try: name + connector, e.g. "ramesh ko"
    if not name:
        for word in to_words:
            pattern = r'([\w\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F]+(?:\s+[\w\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F]+)?)\s+' + re.escape(word) + r'(?:\b|\s)'
            m = re.search(pattern, lower)
            if m:
                raw = m.group(1).strip()
                if raw:
                    name = ' '.join([w.capitalize() for w in raw.split()[:2]])
                    break

    # Step 4 — build response
    if amount and name:
        parsed_text = f'Send ₹{amount} to {name}'
    elif amount:
        parsed_text = f'Send ₹{amount} (recipient not found)'
    elif name:
        parsed_text = f'Send to {name} (amount not found)'
    else:
        parsed_text = 'Could not understand. Try: "Send 200 to Ramesh"'

    return jsonify({
        'status': 'success',
        'amount': amount,
        'to':     name,
        'parsed': parsed_text
    })

# ════════════════════════════════════════════════════════
#  UTILITY ROUTES
# ════════════════════════════════════════════════════════

@app.route('/api/status', methods=['GET'])
def status():
    """
    Health check endpoint — used by the Online/Offline badge in the navbar.
    If this responds, the server is online.
    """
    return jsonify({
        'status':    'online',
        'server':    'VaaniPay Backend v1.0',
        'timestamp': time.strftime('%Y-%m-%dT%H:%M:%S'),
        'balance':   balance
    })

# ════════════════════════════════════════════════════════
#  SECTION 8 — TRANSACTION HISTORY API
#  Returns full transaction list with filters
# ════════════════════════════════════════════════════════

@app.route('/api/transactions/all', methods=['GET'])
def get_all_transactions():
    """
    Returns paginated transaction history.
    Optional query params:
      ?type=sent        → only sent
      ?type=received    → only received
      ?limit=20         → how many to return
    """
    tx_type = request.args.get('type', 'all')
    limit   = int(request.args.get('limit', 20))

    filtered = transactions
    if tx_type == 'sent':
        filtered = [t for t in transactions if t.get('type') == 'sent']
    elif tx_type == 'received':
        filtered = [t for t in transactions if t.get('type') == 'received']

    # Return most recent first
    result = list(reversed(filtered))[:limit]

    total_sent     = sum(t['amount'] for t in transactions if t.get('type') == 'sent')
    total_received = sum(t['amount'] for t in transactions if t.get('type') == 'received')

    return jsonify({
        'status':         'success',
        'transactions':   result,
        'count':          len(result),
        'total_sent':     total_sent,
        'total_received': total_received,
        'balance':        balance
    })


@app.route('/api/transactions/<txn_id>', methods=['GET'])
def get_transaction_detail(txn_id):
    """Get a single transaction by its ID"""
    for txn in transactions:
        if txn['id'] == txn_id:
            return jsonify({'status': 'success', 'transaction': txn})
    return jsonify({'status': 'error', 'message': f'Transaction {txn_id} not found'}), 404


# ════════════════════════════════════════════════════════
#  SECTION 9 — USER PROFILE & SETTINGS API
#  Stores user preferences in session
# ════════════════════════════════════════════════════════

# In-memory user store (use a database in production)
users = {}

@app.route('/api/profile', methods=['GET'])
def get_profile():
    """Return current user profile"""
    phone = session.get('user', 'guest')
    user  = users.get(phone, {
        'phone':    phone,
        'name':     'VaaniPay User',
        'language': 'hi-IN',
        'balance':  balance,
        'txn_count': len(transactions)
    })
    return jsonify({'status': 'success', 'profile': user})


@app.route('/api/profile/update', methods=['POST'])
def update_profile():
    """
    Update user preferences.
    Frontend sends: { name, language, upi_id }
    """
    phone = session.get('user', 'guest')
    data  = request.json

    if phone not in users:
        users[phone] = {'phone': phone}

    # Only update fields that were sent
    if 'name'     in data: users[phone]['name']     = data['name']
    if 'language' in data: users[phone]['language']  = data['language']
    if 'upi_id'   in data: users[phone]['upi_id']    = data['upi_id']

    # Update voice language preference
    if 'language' in data:
        session['language'] = data['language']

    return jsonify({
        'status':  'success',
        'message': 'Profile updated',
        'profile': users[phone]
    })


@app.route('/api/language', methods=['POST'])
def set_language():
    """
    Quick endpoint to change voice language only.
    Frontend sends: { language: "ta-IN" }
    Supported: hi-IN, ta-IN, te-IN, bn-IN, kn-IN,
               mr-IN, gu-IN, pa-IN, or-IN, ml-IN, en-IN
    """
    data = request.json
    lang = data.get('language', 'hi-IN')

    supported = ['hi-IN','ta-IN','te-IN','bn-IN','kn-IN',
                 'mr-IN','gu-IN','pa-IN','or-IN','ml-IN','en-IN']

    if lang not in supported:
        return jsonify({'status': 'error', 'message': f'{lang} not supported'})

    session['language'] = lang
    return jsonify({
        'status':   'success',
        'message':  f'Language set to {LANGUAGES.get(lang, lang)}',
        'language': lang
    })


# ════════════════════════════════════════════════════════
#  SECTION 10 — CONTACTS / FREQUENT PAYEES API
#  Remembers who the user pays often
# ════════════════════════════════════════════════════════

# In-memory contacts store
contacts = {
    'Ramesh': {'name': 'Ramesh Kumar',  'upi': 'ramesh@upi',  'count': 5},
    'Priya':  {'name': 'Priya Sharma',  'upi': 'priya@upi',   'count': 3},
    'Suresh': {'name': 'Suresh Reddy',  'upi': 'suresh@upi',  'count': 2},
}


@app.route('/api/contacts', methods=['GET'])
def get_contacts():
    """Return contacts sorted by payment frequency"""
    sorted_contacts = sorted(
        contacts.values(),
        key=lambda x: x.get('count', 0),
        reverse=True
    )
    return jsonify({
        'status':   'success',
        'contacts': sorted_contacts
    })


@app.route('/api/contacts/add', methods=['POST'])
def add_contact():
    """
    Add or update a contact.
    Frontend sends: { name, upi_id, phone }
    """
    data = request.json
    name = data.get('name', '').strip()
    if not name:
        return jsonify({'status': 'error', 'message': 'Name is required'})

    key = name.split()[0]  # use first name as key
    contacts[key] = {
        'name':  name,
        'upi':   data.get('upi_id', ''),
        'phone': data.get('phone', ''),
        'count': contacts.get(key, {}).get('count', 0)
    }
    return jsonify({'status': 'success', 'message': f'{name} added to contacts'})


@app.route('/api/contacts/lookup/<name>', methods=['GET'])
def lookup_contact(name):
    """
    Look up a contact by first name.
    Used by voice parser to resolve "Ramesh" → full UPI ID
    """
    key     = name.strip().capitalize()
    contact = contacts.get(key)

    if contact:
        # Increment payment count
        contacts[key]['count'] = contacts[key].get('count', 0) + 1
        return jsonify({'status': 'success', 'contact': contact})

    return jsonify({'status': 'error', 'message': f'Contact {name} not found'})

# ── IN-MEMORY USER DATABASE ──────────────────────────────────────────
# Stores accounts created via signup. Resets when server restarts.
# { "9876543210": { phone, name, email, password, created_at } }
user_accounts = {}

# ── DASHBOARD PAGE ───────────────────────────────────────────────────
@app.route('/dashboard')
def dashboard():
    """Show dashboard — only if logged in"""
    if not session.get('user'):
        return redirect('/')   # not logged in → back to homepage
    return render_template('dashboard.html')

# ── CREATE ACCOUNT ───────────────────────────────────────────────────
@app.route('/api/signup', methods=['POST'])
def signup():
    """
    Create a new account.
    Frontend sends: { name, email, phone, password }
    """
    data     = request.json
    name     = data.get('name', '').strip()
    email    = data.get('email', '').strip()
    phone    = data.get('phone', '').strip()
    password = data.get('password', '')

    # Basic validation
    if not name or not email or not phone or not password:
        return jsonify({'status': 'error', 'message': 'All fields are required'})

    if len(password) < 6:
        return jsonify({'status': 'error', 'message': 'Password must be at least 6 characters'})

    # Check if account already exists
    if phone in user_accounts:
        return jsonify({'status': 'error', 'message': 'Account with this phone already exists. Please login.'})

    # Save the account
    user_accounts[phone] = {
        'name':       name,
        'email':      email,
        'phone':      phone,
        'password':   password,   # In production: hash this with bcrypt
        'created_at': time.strftime('%d %b %Y, %I:%M %p'),
        'balance':    5000         # Starting balance
    }

    # Auto-login after signup
    session['user']         = phone
    session['user_name']    = name
    session['balance']      = 5000
    session['otp_verified'] = True

    print(f'\n  NEW ACCOUNT: {name} | {phone} | {email}\n')

    return jsonify({
        'status':  'success',
        'message': f'Account created! Welcome, {name}!',
        'name':    name,
        'phone':   phone
    })

# ── GOOGLE LOGIN (DEMO) ──────────────────────────────────────────────
@app.route('/api/google-login', methods=['POST'])
def google_login():
    """
    Demo Google login — in production you would verify the Google token.
    For hackathon: creates/finds a demo Google account.
    Frontend sends: { name, email } (from Google OAuth popup)
    """
    data  = request.json
    name  = data.get('name', 'Google User')
    email = data.get('email', 'demo@gmail.com')

    # Use email as the "phone" key for Google users
    key = email

    if key not in user_accounts:
        # First time Google login — create account
        user_accounts[key] = {
            'name':       name,
            'email':      email,
            'phone':      email,
            'password':   None,    # Google users have no password
            'provider':   'google',
            'created_at': time.strftime('%d %b %Y, %I:%M %p'),
            'balance':    5000
        }

    # Log them in
    session['user']         = email
    session['user_name']    = name
    session['balance']      = user_accounts[key]['balance']
    session['otp_verified'] = True

    return jsonify({
        'status':  'success',
        'message': f'Welcome, {name}!',
        'name':    name
    })

# ── GET USER NAME (for navbar) ───────────────────────────────────────
@app.route('/api/me', methods=['GET'])
def get_me():
    """Returns current logged-in user info"""
    user = session.get('user')
    name = session.get('user_name', 'User')
    if not user:
        return jsonify({'status': 'error', 'message': 'Not logged in'})
    return jsonify({
        'status':  'success',
        'user':    user,
        'name':    name,
        'balance': session.get('balance', balance)
    })

# ── DEMO RESET (for judges) ──────────────────────────────────────────
@app.route('/api/demo-reset', methods=['POST'])
def demo_reset():
    """Reset balance and transactions for demo purposes"""
    global balance, transactions
    balance      = 5000
    transactions = []
    if session.get('user'):
        session['balance'] = 5000
    return jsonify({'status': 'success', 'message': 'Demo reset! Balance: ₹5000, Transactions: cleared'})


# ════════════════════════════════════════════════════════
#  START THE SERVER
# ════════════════════════════════════════════════════════

if __name__ == '__main__':
    # Make sure the required folders exist
    os.makedirs('static/css',    exist_ok=True)
    os.makedirs('static/js',     exist_ok=True)
    os.makedirs('static/assets', exist_ok=True)

    print('\n' + '='*50)
    print('  VaaniPay Backend is running!')
    print('  Open this in Chrome: http://localhost:5000')
    print('  Press Ctrl+C to stop')
    print('='*50 + '\n')

    app.run(debug=True, port=5000)