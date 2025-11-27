const express = require("express");
const cors = require("cors");
//SABİT
const app = express();

app.use(cors());
app.use(express.json());

// fake user database
let users = [
    {
        id: 1,
        fullName: "Test Kullanıcı",
        email: "test@example.com",
        password: "123456"
    }
];


// REGISTER API
app.post("/api/register", (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "Tüm alanlar zorunludur." });
    }

    const already = users.find(u => u.email === email);
    if (already) {
        return res.status(409).json({ message: "Bu e-posta zaten kayıtlı." });
    }

    const newUser = {
        id: users.length + 1,
        fullName,
        email,
        password
    };

    users.push(newUser);

    return res.status(201).json({
        message: "Kayıt başarılı!",
        user: newUser
    });
});


// LOGIN API
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "E-posta ve şifre zorunlu." });
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "E-posta veya şifre hatalı." });
    }

    return res.json({
        message: "Giriş başarılı!",
        user
    });
});


// RESET PASSWORD API
app.post("/api/reset-password", (req, res) => {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
        return res.status(400).json({ message: "Tüm alanlar zorunludur." });
    }

    if (code !== "123456") {
        return res.status(401).json({ message: "Kod hatalı." });
    }

    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    user.password = newPassword;

    return res.json({
        message: "Şifre başarıyla sıfırlandı.",
        user
    });
});


// SERVER
app.listen(5000, () => {
    console.log("Backend çalışıyor → http://localhost:5000");
});
