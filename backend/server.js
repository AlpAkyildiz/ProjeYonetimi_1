const express = require("express");
const cors = require("cors");
//SABİT
const app = express();

// gerekli middlewares
app.use(cors());
app.use(express.json());

// Sahte veri tabanı (gerçek DB istemiyorlar)
let users = [];

// REGISTER (Kayıt API)
app.post("/api/register", (req, res) => {
    const { fullName, email, password } = req.body;

    // boş kontrolü
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "Tüm alanlar zorunludur." });
    }

    // email daha önce kullanıldı mı?
    const already = users.find(u => u.email === email);
    if (already) {
        return res.status(409).json({ message: "Bu e-posta zaten kayıtlı." });
    }

    // yeni kullanıcıyı kaydet
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

// SUNUCU
app.listen(5000, () => {
    console.log("Backend çalışıyor → http://localhost:5000");
});
