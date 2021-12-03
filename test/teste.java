import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotSame;

import java.util.concurrent.TimeUnit;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

class teste {

	public static ChromeDriver cd;

	@BeforeAll
	public static void beforeAll() {
		System.setProperty("webdriver.chrome.driver", "./lib/chromedriver.exe");
		cd = new ChromeDriver();
		cd.manage().timeouts().implicitlyWait(6, TimeUnit.SECONDS);
		cd.manage().window().maximize();
	}

	@AfterAll
	public static void afterAll() {
		cd.close();
	}

	@Test
	public void loginBemSucedido() {
		cd.get("http://localhost:3000");
		cd.findElement(By.id("email")).sendKeys("teste@email.com");
		cd.findElement(By.id("senha")).sendKeys("teste123");
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div/div/form/div[3]/button")).click();
		var tituloPainel = cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/h1"));
		assertEquals("Painel", tituloPainel.getText());
	}

	@Test
	public void erroNoLogin() {
		cd.get("http://localhost:3000");
		cd.findElement(By.id("email")).sendKeys("teste@email.com");
		cd.findElement(By.id("senha")).sendKeys("senhaerrada");
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div/div/form/div[3]/button")).click();
		var erro = cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div/div/div[2]"));
		assertEquals("Erro no login! Por favor verifique as informações.", erro.getText());
	}

	
}