const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// fake user list (gerçek DB yok)
let users = [
    {
        id: 1,
        fullName: "Test Kullanıcı",
        email: "test@example.com",
        password: "123456"
    }
];

// LOGIN API
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    // boş kontrolü
    if (!email || !password) {
        return res.status(400).json({ message: "E-posta ve şifre zorunlu." });
    }

    // kullanıcıyı bul
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "E-posta veya şifre hatalı." });
    }

    return res.json({
        message: "Giriş başarılı!",
        user
    });
});

// SERVER
app.listen(5000, () => {
    console.log("Backend çalışıyor → http://localhost:5000");
});
