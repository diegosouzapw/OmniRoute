# Import providers from a CSV or JSON file (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇧🇦 [bs](../../../bs/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashboard → Πάροχοι → **Εισαγωγή από αρχείο** δημιουργεί συνδέσεις με κλειδί API από μια λίστα CSV ή JSON. Κάθε γραμμή μπορεί να στοχεύει διαφορετικό πάροχο. Η μερική αποτυχία αποτελεί μέρος της σύμβασης: οι έγκυρες γραμμές εξακολουθούν να εισάγονται όταν άλλες αποτυγχάνουν και το παράθυρο διαλόγου παραθέτει τους λόγους απόρριψης των αποτυχημένων γραμμών.

Αυτή η εισαγωγή **δεν** δημιουργεί νέους κόμβους τελικών σημείων συμβατών με OpenAI/Anthropic. Δημιουργήστε τους πρώτα (Dashboard → Πάροχοι → Προσθήκη συμβατού με OpenAI ή `omniroute nodes add`) και, στη συνέχεια, εισαγάγετε γραμμές των οποίων η στήλη `provider` περιέχει το id του συγκεκριμένου κόμβου. Ένα `baseUrl` ανά γραμμή μπορεί ακόμη να παρακάμψει τη διεύθυνση URL του κόμβου.

## CSV (βάσει θέσης)

Τα ονόματα των στηλών είναι διακοσμητικά. Ο αναλυτής διαχωρίζει κάθε γραμμή και αποδομεί τις τιμές βάσει ευρετηρίου:

| Ευρετήριο | Πεδίο      | Απαιτείται | Σημειώσεις                                                                                                                        |
| --------- | ---------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 0         | `provider` | ναι        | Υπάρχον id διαχειριζόμενου παρόχου (`openai`, `anthropic`, …) **ή** id ήδη καταχωρισμένου **κόμβου** συμβατού με OpenAI/Anthropic |
| 1         | `name`     | ναι        | Εμφανιζόμενο όνομα σύνδεσης                                                                                                       |
| 2         | `apiKey`   | ναι        | Κλειδί API                                                                                                                        |
| 3         | `baseUrl`  | όχι        | Παράκαμψη διεύθυνσης URL ανά γραμμή                                                                                               |
| 4         | `priority` | όχι        | Ακέραιος αριθμός 1–100                                                                                                            |

Μια πρώτη γραμμή της οποίας η πρώτη στήλη είναι η κυριολεκτική λέξη `provider` (ανεξαρτήτως πεζών-κεφαλαίων) παραλείπεται ως κεφαλίδα. Οι κενές γραμμές και τα σχόλια `#` παραλείπονται.

Κατεβάστε ένα αρχικό αρχείο από το παράθυρο διαλόγου εισαγωγής (**Λήψη προτύπου CSV**). Παράδειγμα:

```csv
# Εισαγωγή παρόχων OmniRoute (στήλες βάσει θέσης)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

Ένα επινοημένο id όπως το `openai-compatible-chat-001` δεν αποτελεί κόμβο. Το API επιστρέφει `Άγνωστος ή μη υποστηριζόμενος πάροχος` για τη συγκεκριμένη γραμμή· το παράθυρο διαλόγου το εμφανίζει δίπλα στο όνομα της γραμμής.

## JSON

Ένας πίνακας JSON από αντικείμενα με τα ίδια πεδία (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`). Σε αντίθεση με το CSV, τα κλειδιά JSON έχουν συγκεκριμένα ονόματα.

```json
[
  {
    "provider": "openai",
    "name": "Prod OpenAI",
    "apiKey": "sk-your-openai-key",
    "priority": 1
  }
]
```
