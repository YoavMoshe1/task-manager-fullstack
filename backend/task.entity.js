const { EntitySchema } = require("typeorm"); // כלי ליצירת Entity (טבלה)

module.exports = new EntitySchema({ // הגדרת טבלה חדשה
    name: "Task",        // שם ה-Entity בקוד
    tableName: "tasks",  // שם הטבלה בפועל ב-DB
    columns: {
        id: {
            primary: true,      // מפתח ראשי
            type: "int",        // מספר
            generated: true,    // auto increment
        },
        title: {
            type: "varchar",    // טקסט
        },
        completed: {
            type: "boolean",    // true/false
            default: false,     // ברירת מחדל
        },
        createdAt: {
            type: "timestamp",  // תאריך + שעה
            createDate: true,   // מתמלא אוטומטית ביצירה
        },
        priority: {
            type: "int",        // מספר
            default: 1,         // ברירת מחדל
        },
    },
});