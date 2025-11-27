const express = require("express");
const cors = require("cors");

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


// RESET PASSWORD API
app.post("/api/reset-password", (req, res) => {
    const { email, code, newPassword } = req.body;

    // boş kontrolü
    if (!email || !code || !newPassword) {
        return res.status(400).json({ message: "Tüm alanlar zorunludur." });
    }

    // kod doğrulaması (ödev için sabit kod)
    if (code !== "123456") {
        return res.status(401).json({ message: "Kod hatalı." });
    }

    // kullanıcıyı bul
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    // şifreyi güncelle
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

