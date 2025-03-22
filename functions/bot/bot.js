const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);

// Start command handler
bot.start(ctx => {
  console.log("Received /start command");
  try {
    ctx.reply(
      "💬 Bun venit! Sunt aici să te ajut cu sprijin pentru sănătatea mintală. Alege una dintre opțiunile de mai jos sau scrie o întrebare.",
      {
        reply_markup: {
          keyboard: [
            ["Cum pot gestiona stresul?", "Mă simt anxios, ce pot face?"],
            ["Unde pot găsi sprijin psihologic?", "Am nevoie de tehnici de relaxare"],
            ["Vreau să vorbesc cu un consilier", "Este urgent, am nevoie de ajutor imediat!"]
          ],
          resize_keyboard: true,
        }
      }
    );
  } catch (e) {
    console.error("Error in start action:", e);
    ctx.reply("A apărut o eroare");
  }
});

// 1. Stress management
bot.hears("Cum pot gestiona stresul?", async (ctx) => {
  try {
    await ctx.reply(
      "💬 Stresul este normal, dar poate fi gestionat. Ai încercat tehnici de respirație sau planificare eficientă a timpului? Dacă vrei, îți pot oferi un exercițiu ghidat.\n\nAi dori să încercăm?",
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Da", callback_data: "stres_da" }],
            [{ text: "Nu", callback_data: "stres_nu" }]
          ]
        }
      }
    );
  } catch (error) {
    console.log("Error:", error);
    ctx.reply("A apărut o eroare");
  }
});

// 2. Anxiety management
bot.hears("Mă simt anxios, ce pot face?", async (ctx) => {
  try {
    await ctx.reply(
      "💬 Anxietatea poate fi copleșitoare, dar nu ești singur. Încearcă să îți observi respirația și să îți aduci atenția asupra prezentului. Vrei să facem un exercițiu împreună?\n\nAi dori să încercăm?",
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Da", callback_data: "anxietate_da" }],
            [{ text: "Nu", callback_data: "anxietate_nu" }]
          ]
        }
      }
    );
  } catch (error) {
    console.log("Error:", error);
    ctx.reply("A apărut o eroare");
  }
});

// 3. Psychological support
bot.hears("Unde pot găsi sprijin psihologic?", async (ctx) => {
  try {
    await ctx.reply(
      "💬 Dacă ai nevoie de ajutor profesional, poți contacta serviciul de suport universitar la 📞 0 800 800 22 De asemenea, îți pot sugera resurse online."
    );
    setTimeout(() => {
      ctx.reply("✨ Îngrijește-te și ai încredere în tine! 💙", showMainMenuMarkup());
    }, 100);
  } catch (error) {
    console.log("Error:", error);
    ctx.reply("A apărut o eroare");
  }
});

// 4. Relaxation techniques
bot.hears("Am nevoie de tehnici de relaxare", async (ctx) => {
  try {
    await ctx.reply(
      "💬 Sigur! Îți pot recomanda:\n • O sesiune de respirație profundă 🧘\n • Un exercițiu de meditație ghidată 🎧\n • O tehnică de relaxare progresivă 💆‍♂️\n\nCare dintre acestea ți se pare potrivită?",
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Sesiune de respirație", callback_data: "relaxare_respiratie" }],
            [{ text: "Meditație ghidată", callback_data: "relaxare_meditatie" }],
            [{ text: "Relaxare progresivă", callback_data: "relaxare_progresiva" }]
          ]
        }
      }
    );
  } catch (error) {
    console.log("Error:", error);
    ctx.reply("A apărut o eroare");
  }
});

// 5. Talk to a counselor
bot.hears("Vreau să vorbesc cu un consilier", async (ctx) => {
  try {
    await ctx.reply(
      "💬 Este important să ai sprijin. Poți programa o întâlnire cu un consilier la centru gratuit neovita, consultată gratuită pentru tinerii de 10-24 de ani 📆 https://programare.yk.md"
    );
    setTimeout(() => {
      ctx.reply("✨ Îngrijește-te și ai încredere în tine! 💙", showMainMenuMarkup());
    }, 100);
  } catch (error) {
    console.log("Error:", error);
    ctx.reply("A apărut o eroare");
  }
});

// 6. Urgent help
bot.hears("Este urgent, am nevoie de ajutor imediat!", async (ctx) => {
  try {
    await ctx.reply(
      "💬 Dacă ai nevoie de ajutor urgent, te rog sună la 112 sau la linia de suport psihologic: 📞 +373 8008 8008 (gratuit, non-stop). Nu ești singur, ajutorul este disponibil."
    );
    setTimeout(() => {
      ctx.reply("✨ Îngrijește-te și ai încredere în tine! 💙", showMainMenuMarkup());
    }, 100);
  } catch (error) {
    console.log("Error:", error);
    ctx.reply("A apărut o eroare");
  }
});

// Handle button clicks
bot.on('callback_query', async (ctx) => {
  const callbackData = ctx.callbackQuery.data;
  
  // Always answer the callback query to remove the loading state
  await ctx.answerCbQuery();

  try {
    // Stress management responses
    if (callbackData === "stres_da") {
      await ctx.reply("Haide să încercăm, accesează linkul\nhttps://youtu.be/YsHAbhYJUBQ?si=fFHBHzf8NrKwvASQ");
      
      setTimeout(() => {
        ctx.reply("✨ Îngrijește-te și ai încredere în tine! 💙", showMainMenuMarkup());
      }, 100);
    } 
    else if (callbackData === "stres_nu") {
      ctx.reply("✨ Îngrijește-te și ai încredere în tine! 💙", showMainMenuMarkup());
    }
    
    // Anxiety management responses
    else if (callbackData === "anxietate_da") {
      await ctx.reply("Haide să încercăm, accesează linkul\nhttps://youtu.be/5PrGJxXn21g?si=-_6H-yQuR68mzyZJ");
      
      setTimeout(() => {
        ctx.reply("✨ Îngrijește-te și ai încredere în tine! 💙", showMainMenuMarkup());
      }, 100);
    }
    else if (callbackData === "anxietate_nu") {
      ctx.reply("✨ Îngrijește-te și ai încredere în tine! 💙", showMainMenuMarkup());
    }
    
    // Relaxation techniques responses
    else if (callbackData === "relaxare_respiratie") {
      await ctx.reply("La sesiune de respirație: https://youtu.be/LiUnFJ8P4gM?si=hZQEq6vBplKVvfeX");
      
      setTimeout(() => {
        ctx.reply("✨ Îngrijește-te și ai încredere în tine! 💙", showMainMenuMarkup());
      }, 100);
    }
    else if (callbackData === "relaxare_meditatie") {
      await ctx.reply("Un exercițiu de meditație ghidată: https://youtu.be/_twPuLbqzLM?si=vOU7KsUIyqfqlRuM");
      
      setTimeout(() => {
        ctx.reply("✨ Îngrijește-te și ai încredere în tine! 💙", showMainMenuMarkup());
      }, 100);
    }
    else if (callbackData === "relaxare_progresiva") {
      await ctx.reply("O tehnică de relaxare progresivă: https://youtu.be/yRfGqpYloKY?si=x3Bnqiq6prKu1TzV");
      
      setTimeout(() => {
        ctx.reply("✨ Îngrijește-te și ai încredere în tine! 💙", showMainMenuMarkup());
      }, 100);
    }
  } catch (error) {
    console.log("Error in callback_query:", error);
    ctx.reply("A apărut o eroare");
  }
});

// Helper function to create the main menu markup
function showMainMenuMarkup() {
  return {
    reply_markup: {
      keyboard: [
        ["Cum pot gestiona stresul?", "Mă simt anxios, ce pot face?"],
        ["Unde pot găsi sprijin psihologic?", "Am nevoie de tehnici de relaxare"],
        ["Vreau să vorbesc cu un consilier", "Este urgent, am nevoie de ajutor imediat!"]
      ],
      resize_keyboard: true,
    }
  };
}

// Handle raw text messages (not matching predefined commands)
bot.on('text', (ctx) => {
  ctx.reply("Te rog selectează una dintre opțiunile din meniu pentru a-ți putea oferi cel mai bun ajutor.", showMainMenuMarkup());
});

// AWS Lambda handler
exports.handler = async (event) => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: "" };
  } catch (e) {
    console.error("Error in handler:", e);
    return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" };
  }
};