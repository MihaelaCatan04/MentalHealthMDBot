const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);

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
          one_time_keyboard: true,
          resize_keyboard: true,
        }
      }
    );
  } catch (e) {
    console.error("Error in start action:", e);
    ctx.reply("Error occurred");
  }
});

bot.hears("🔹 Cum pot gestiona stresul?", async (ctx) => {
  try {
    await ctx.reply(
      "💬 Stresul este normal, dar poate fi gestionat. Ai încercat tehnici de respirație sau planificare eficientă a timpului? Dacă vrei, îți pot oferi un exercițiu ghidat.",
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
    console.log("Error", error);
    ctx.reply("Error occurred");
  }
});

// Handle button presses
bot.on('callback_query', async (ctx) => {
  const callbackData = ctx.callbackQuery.data;

  // Handle 'Da' button for stress management
  if (callbackData === "stres_da") {
    try {
      await ctx.reply(
        "💬 Haide să încercăm, accesează linkul: https://youtu.be/YsHAbhYJUBQ?si=fFHBHzf8NrKwvASQ"
      );
      ctx.answerCbQuery(); // Answer callback to remove the loading state from the button
    } catch (error) {
      console.log("Error", error);
      ctx.reply("Error occurred");
    }
  }

  // Handle 'Nu' button for stress management (return to main menu)
  if (callbackData === "stres_nu") {
    try {
      await ctx.reply(
        "🔹 Cum pot gestiona stresul?\n🔹 Mă simt anxios, ce pot face?\n🔹 Unde pot găsi sprijin psihologic?\n🔹 Am nevoie de tehnici de relaxare\n🔹 Vreau să vorbesc cu un consilier\n🔹 Este urgent, am nevoie de ajutor imediat!",
        {
          reply_markup: {
            keyboard: [
              ["🔹 Cum pot gestiona stresul?", "🔹 Mă simt anxios, ce pot face?"],
              ["🔹 Unde pot găsi sprijin psihologic?", "🔹 Am nevoie de tehnici de relaxare"],
              ["🔹 Vreau să vorbesc cu un consilier", "🔹 Este urgent, am nevoie de ajutor imediat!"]
            ],
            one_time_keyboard: true,
            resize_keyboard: true,
          }
        }
      );
      ctx.answerCbQuery();
    } catch (error) {
      console.log("Error", error);
      ctx.reply("Error occurred");
    }
  }
});

exports.handler = async (event) => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: "" };
  } catch (e) {
    console.error("Error in handler:", e);
    return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" };
  }
};
