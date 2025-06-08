import secrets
import string

def generate_temp_payment_token(last_four_digits, prefix="BOOKLY", random_length=10):
    characters = string.ascii_uppercase + string.digits
    random_chars = ''.join(secrets.choice(characters) for _ in range(random_length))
    return f"{prefix}-{random_chars}-{last_four_digits}"

def generate_reference_number(prefix="BOOKLY", random_length=8):
    characters = string.ascii_uppercase + string.digits
    random_chars = ''.join(secrets.choice(characters) for _ in range(random_length))
    return f"{prefix}-{random_chars}"