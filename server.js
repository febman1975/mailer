import express from "express";
import bodyParser from "body-parser";
import { sendMail } from "./mailer.js";

const app = express();


// Use the dynamic port provided by Railway, default to 3000 for local testing
const PORT = process.env.PORT || 3000;

/* Middleware */
app.use(bodyParser.json());

/* Root route - Critical for Railway's initial health check */

app.use(bodyParser.json());

 15d9365 (Fix merge conflicts and stabilize ESM mailer)
app.get("/", (req, res) => {
  res.status(200).send("Mailer API is Online");
});


/* Health check endpoint - Match this to 'Healthcheck Path' in Railway Settings */
=======
 (Fix merge conflicts and stabilize ESM mailer)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.post("/send", async (req, res) => {
  try {

    const { to, subject, template, data, from } = req.body;

    if (!to || !subject || !template) {
      return res.status(400).json({
        error: "Missing required fields: to, subject, template"
      });
    }

    const result = await sendMail({ to, subject, template, data, from });

    res.json({ 
      success: true, 
      message: "Email processed",
      details: result 
    });
  } catch (err) {
    console.error("Send error:", err);
    res.status(500).json({
      success: false,
      error: err.message || "Failed to send email"
    });
  }
});

/* 
  RAILWAY BINDING FIX: 
  We explicitly listen on '0.0.0.0' to ensure the Railway Edge Proxy can reach the container.
*/
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server strictly listening on 0.0.0.0:${PORT}`);
});

// Log any server-level errors (like port collisions)
server.on('error', (err) => {
  console.error('CRITICAL SERVER ERROR:', err);
});
=======
    const result = await sendMail(req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mailer listening on port ${PORT}`);
});
>>>>>>> 15d9365 (Fix merge conflicts and stabilize ESM mailer)
