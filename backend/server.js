const cors = require("cors");
require("reflect-metadata"); // חובה ל-TypeORM (metadata)
const AppDataSource = require("./data-source");

const express = require("express"); // מייבא את הסיפרייה
const app = express(); // יוצר את השרת
app.use(express.json()); // לוקח גייסון והופך לאובייקט 
app.use(cors());

// middleware שרץ על כל בקשה לשרת
const logger = require("./middlewares/logger");
app.use(logger);

//הודעה דיפולטיבית לבדיקה שהשרת רץ
app.get('/', (req, res) => {
    res.send("API is running 🚀");
});


// מחבר בפועל את האפליקציה לבסיס הנתונים
AppDataSource.initialize().then(() => {
    const taskRepo = AppDataSource.getRepository("Task"); // יוצר גישה (Repository) לטבלה Task

    // GET
    app.get('/tasks', async (req, res) => {
        try {
            const tasks = await taskRepo.find();   // מביא את כל הרשומות מהטבלה (DB)
            res.json(tasks); // מחזיר ללקוח JSON
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Server error" }); 
        }
    });

    // POST
    app.post("/tasks", async (req, res) => {
        try {
            // בדיקה אם יש title (חובה)
            if (!req.body.title) {
            return res.status(400).json({ message: "Title required" }); // שגיאת משתמש
            }
            const newTask = taskRepo.create({ // יוצר אובייקט חדש (לא שומר עדיין)
                title: req.body.title,
                priority: req.body.priority,
                description: req.body.description,
            });
    
            await taskRepo.save(newTask); // שומר ב-DB
            res.status(201).json(newTask); // מחזיר נוצר
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    });

    // DELETE
    app.delete("/tasks/:id", async (req, res) => {
        try {
            const result = await taskRepo.delete(req.params.id); // מוחק לפי id מה-URL
    
            if (result.affected === 0) { // אם לא נמחק כלום
                return res.status(404).json({ message: "Task not found" });
            }
    
            res.json({ message: "Deleted successfully" });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    });

    // PUT
    app.put("/tasks/:id", async (req, res) => {
        try {
            const updateData = {}; // אובייקט ריק לעדכון
            if (req.body.title !== undefined) updateData.title = req.body.title; // מוסיף רק אם קיים
            if (req.body.priority !== undefined) updateData.priority = req.body.priority; // מוסיף רק אם קיים
            if (req.body.completed !== undefined) updateData.completed = req.body.completed;
            if (req.body.description !== undefined) updateData.description = req.body.description;
            const result = await taskRepo.update(req.params.id, updateData); // משתמש באובייקט החדש ומעדכן את ה db 

    
            if (result.affected === 0) {
                return res.status(404).json({ message: "Task not found" });
            }
    
            res.json({ message: "Updated successfully" });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    });
    // הפעלץ השרת
    app.listen(3000, () => {
        console.log("Server running 🚀");
    });
});
