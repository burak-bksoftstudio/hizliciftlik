# 🐄 Hızlı Çiftlik — Landing Page

> Kurbanlık satış yerleri ve işletmeleri için geliştirilmiş **Hızlı Çiftlik** uygulamasının tanıtım / pazarlama web sitesi.

---

## 📌 Proje Hakkında

**Hızlı Çiftlik**, Könez Besi Çiftliği adına [BK Softstudio](https://bksoftstudio.com) tarafından geliştirilen bir kurbanlık yönetim uygulamasıdır. Bu repo, söz konusu uygulamanın **statik landing page** kaynak kodunu içermektedir.

Sayfa; müşteri kaydı, hayvan ve hisse yönetimi, ödeme takibi, kesim sırası ve SMS bildirimi gibi temel özellikleri tanıtmak için tasarlanmıştır.

---

## 🚀 Özellikler

- **Müşteri Kaydı** — Hızlı müşteri ekleme, müşteri bazlı detay görünümü, kolay arama ve filtreleme
- **Hayvan Kaydı & Hisse Yönetimi** — Büyük/küçükbaş hayvan kaydı, hisseli (1/7 – 7/7) ve müstakil satış desteği
- **Kesim Sırasına Alma** — Otomatik sıra numarası, günlük sıra listesi, anlık sıra durumu takibi
- **Ödeme Takibi** — Peşinat ve kalan bakiye, kısmi ödeme desteği, tahsilat özet raporu
- **SMS Bildirimi** — Toplu SMS gönderimi, bayram kutlama & ödeme hatırlatma şablonları
- **Kesim Saati Bildirimi** — Tahmini kesim saati SMS'i, sıra yaklaştığında bildirim

---

## 🛠 Teknoloji Stack

| Katman | Teknoloji |
|--------|-----------|
| Yapı | Vanilla HTML5 |
| Stil | Vanilla CSS3 (CSS Custom Properties, Grid, Flexbox) |
| Mantık | Vanilla JavaScript (ES6+) |
| Fontlar | Google Fonts — Lora (serif) + Inter (sans) |
| Deploy | Netlify (static hosting) |

Herhangi bir framework, build tool veya paket bağımlılığı **yoktur**. Dosyalar doğrudan tarayıcıda açılabilir.

---

## 📁 Dosya Yapısı

```
hizliciftlik/
├── index.html      # Ana sayfa (tek sayfa)
├── style.css       # Tüm stiller
├── script.js       # Sayfa etkileşimleri (navbar scroll, reveal animasyonları, form)
├── _redirects      # Netlify yönlendirme kuralları
├── _headers        # Netlify HTTP başlıkları
└── .gitignore
```

---

## 💻 Yerel Geliştirme

Herhangi bir kurulum gerekmez. Repo'yu klonlayın ve `index.html` dosyasını tarayıcıda açın:

```bash
git clone https://github.com/burak-bksoftstudio/hizliciftlik.git
cd hizliciftlik
open index.html        # macOS
# veya
start index.html       # Windows
```

İsterseniz VS Code ile basit bir yerel sunucu başlatabilirsiniz:

```bash
# VS Code Live Server eklentisi ile
# Explorer'da index.html → sağ tık → "Open with Live Server"
```

Ya da Python ile:

```bash
python3 -m http.server 3000
# Tarayıcıda: http://localhost:3000
```

---

## 🌐 Yayın

Site **Netlify** üzerinde barındırılmaktadır. `main` branch'e her push sonrasında otomatik deploy tetiklenir.

```
main branch → Netlify CI/CD → Production
```

### Deploy Komutları (manuel)

```bash
# Değişiklikleri commit et
git add -A
git commit -m "feat: açıklama"
git push origin main
```

---

## 🎨 Tasarım Sistemi

Tasarım, **Hexa template**'ten ilham alınarak oluşturulmuştur:

- **Renk Paleti:** Açık off-white arkaplan (`#F4F6F8`), yeşil vurgu (`#16a34a`)
- **Tipografi:** Serif başlıklar (Lora) + sans-serif gövde (Inter)
- **Bileşenler:** Flat minimal kartlar, pill-shaped butonlar, geniş whitespace
- **Animasyonlar:** Scroll-reveal, floating cards, subtle hover efektleri

### CSS Değişkenleri

```css
--bg: #F4F6F8;
--green: #16a34a;
--font-serif: 'Lora', Georgia, serif;
--font-sans: 'Inter', system-ui, sans-serif;
```

---

## 📱 Responsive Tasarım

| Breakpoint | Hedef |
|-----------|-------|
| `> 1024px` | Masaüstü (tam grid düzeni) |
| `≤ 1024px` | Tablet (2 kolon düzeni) |
| `≤ 768px` | Mobil (tek kolon, hamburger menü) |
| `≤ 480px` | Küçük mobil (optimize padding, tam genişlik butonlar) |

---

## 🔧 Yapılandırma

### `_redirects` (Netlify)
Tüm rotaları `index.html`'e yönlendirir (SPA desteği için).

### `_headers` (Netlify)
Güvenlik ve önbellek başlıkları tanımlar.

---

## 📞 İletişim

| | |
|--|--|
| **Firma** | Könez Besi Çiftliği |
| **Konum** | Samsun, Türkiye |
| **Geliştirici** | [BK Softstudio](https://bksoftstudio.com) |

---

## 📄 Lisans

Bu proje **Könez Besi Çiftliği** ve **BK Softstudio**'ya aittir. İzinsiz kullanılamaz.

© 2026 Hızlı Çiftlik · Tüm hakları saklıdır.
