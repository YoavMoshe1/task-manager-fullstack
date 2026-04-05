require("reflect-metadata"); // חובה ל-TypeORM (metadata)

const { DataSource } = require("typeorm"); // כלי לחיבור וניהול DB
const Task = require("../backend/task.entity"); // ה-Entity (הטבלה)

module.exports = new DataSource({ // יצירת וייצוא חיבור ל-DB
    type: "postgres",        // סוג בסיס נתונים
    host: "localhost",       // השרת (המחשב שלך)
    port: 5432,              // פורט של Postgres
    username: "gilmoshe",    // שם משתמש ל-DB
    database: "gilmoshe",    // שם בסיס הנתונים
    synchronize: false,      // לא משנה טבלאות אוטומטית
    logging: false,          // לא מדפיס שאילתות לטרמינל
    entities: [Task],        // רשימת הטבלאות (Entities)
    migrations: ["./migrations/*.js"], // קבצי שינוי DB
});