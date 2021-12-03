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

	@Test
	public void sucessoNoCadastroDeProduto() {
		cd.get("http://localhost:3000");

		// Pag. Login
		cd.findElement(By.id("email")).sendKeys("teste@email.com");
		cd.findElement(By.id("senha")).sendKeys("teste123");
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div/div/form/div[3]/button")).click();

		// Pag. Home
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[1]/section[2]/header/a")).click();

		// Pag. Cadastro Produto
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[1]/input")).sendKeys("Produto 3");
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/input")).sendKeys("3");
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[3]/textarea")).sendKeys("Produto de Teste");
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/button")).click();
		var alert = cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[4]/div/p"));

		assertEquals("☑ Operação realizada com sucesso!", alert.getText());
	}

	@Test
	public void adicionarProdutoCarrinho() {
		cd.get("http://localhost:3000");

		// Pag. Login
		cd.findElement(By.id("email")).sendKeys("teste@email.com");
		cd.findElement(By.id("senha")).sendKeys("teste123");
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div/div/form/div[3]/button")).click();

		// Pag. Home
		WebElement select = cd.findElement(By.xpath("//*[@id=\"selectProduct\"]"));
		Select selectObject = new Select(select);
		selectObject.selectByVisibleText("Produto 1");
		cd.findElement(By.xpath("//*[@id=\"inputQuantity\"]")).sendKeys("4");
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[1]/section[1]/form/div[4]/button")).click();

		var nomeProd = cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/section/div[1]/div/div[1]/div[1]"));
		var descProd = cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/section/div[1]/div/div[2]"));
		var valorProdTotal = cd
				.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/section/div[1]/div/div[1]/div[2]"));
		var quantProd = cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/section/div[1]/div/div[3]/div[1]"));

		assertEquals("Produto 1", nomeProd.getText());
		assertEquals("Produto de teste", descProd.getText());
		assertEquals("R$ 8", valorProdTotal.getText());
		assertEquals("Quantidade: 4", quantProd.getText());
	}

	@Test
	public void removerProdutoCarrinho() {
		cd.get("http://localhost:3000");

		// Pag. Login
		cd.findElement(By.id("email")).sendKeys("teste@email.com");
		cd.findElement(By.id("senha")).sendKeys("teste123");
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div/div/form/div[3]/button")).click();

		// Pag. Home

		WebElement select = cd.findElement(By.xpath("//*[@id=\"selectProduct\"]"));
		Select selectObject = new Select(select);
		selectObject.selectByVisibleText("Produto 1");
		cd.findElement(By.xpath("//*[@id=\"inputQuantity\"]")).sendKeys("4");

		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[1]/section[1]/form/div[4]/button")).click();
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/section/div[1]/div/div[3]/div[2]")).click();

		var carrinho = cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/section/div/div"));

		assertEquals("Não há nada no carrinho.", carrinho.getText());
	}

	@Test
	public void vendaBemSucedida() {
		cd.get("http://localhost:3000");

		// Pag. Login
		cd.findElement(By.id("email")).sendKeys("teste@email.com");
		cd.findElement(By.id("senha")).sendKeys("teste123");
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div/div/form/div[3]/button")).click();

		// Pag. Home

		WebElement select = cd.findElement(By.xpath("//*[@id=\"selectProduct\"]"));
		Select selectObject = new Select(select);
		selectObject.selectByVisibleText("Produto 1");
		cd.findElement(By.xpath("//*[@id=\"inputQuantity\"]")).sendKeys("2");

		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[1]/section[1]/form/div[4]/button")).click();
		cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/section/div[2]/button")).click();

		var carrinho = cd.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/section/div/div"));

		assertEquals("Não há nada no carrinho.", carrinho.getText());
	}
	
}