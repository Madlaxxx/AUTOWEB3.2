const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { email, password } = require("../user");

test("PositiveTest", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  await page.locator('[placeholder="Email"]').click();
  await page.locator('[placeholder="Email"]').fill(email);
  await page.locator('[placeholder="Пароль"]').click();
  await page.locator('[placeholder="Пароль"]').fill(password);
  await page.locator('[data-testid="login-submit-btn"]').click();
  await page.waitForURL("https://netology.ru/profile/5956121");
  await expect(page).toHaveURL("https://netology.ru/profile/5956121");

});

test("NegativeTest", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  await page.locator('[placeholder="Email"]').click();
  await page.locator('[placeholder="Email"]').fill("masha23@gmail.com");
  await page.locator('[placeholder="Пароль"]').click();
  await page.locator('[placeholder="Пароль"]').fill("Qwerty12");
  await page.locator('[data-testid="login-submit-btn"]').click();
  const error = await page.locator('[data-testid="login-error-hint"]');
  await expect(error).toHaveText("Вы ввели неправильно логин или пароль.");
  
});
