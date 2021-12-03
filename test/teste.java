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

    @Test
	public void sucessoNaEdicaoDeProduto() {
		cd.get("http://localhost:3000");

		// Pag. Login
		cd.findElement(By.id("email")).sendKeys("teste@email.com");
		cd.findElement(By.id("senha")).sendKeys("teste123");
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div/div/form/div[3]/button")).click();

		// Pag. Home
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[1]/section[2]/table/tbody/tr[1]/td[3]/a")).click();

		// Pag. Edição Produto
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[1]/input")).sendKeys(" Alterado");
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/input")).clear();
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/input")).sendKeys("12");
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[3]/textarea")).sendKeys(" Alterado");
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/button")).click();
		var alert = cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[4]/div/p"));

		assertEquals("☑ Operação realizada com sucesso!", alert.getText());
	}

    @Test
	public void exclusaoDeProduto() {
		cd.get("http://localhost:3000");

		// Pag. Login
		cd.findElement(By.id("email")).sendKeys("teste@email.com");
		cd.findElement(By.id("senha")).sendKeys("teste123");
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div/div/form/div[3]/button")).click();

		// Pag. Home
		var primeiroProd = cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[1]/section[2]/table/tbody/tr[1]/th"));

		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[1]/section[2]/table/tbody/tr[1]/td[3]/span")).click();
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[1]/section[2]/table/tbody/tr[1]/td[3]/span")).click();

		var novoPrimeiroProd = cd
				.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[1]/section[2]/table/tbody/tr[1]/th"));

		assertNotSame(primeiroProd, novoPrimeiroProd);
	}
	
}