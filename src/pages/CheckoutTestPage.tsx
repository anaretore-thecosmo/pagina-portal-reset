const CHECKOUT_URL = "https://pay.kiwify.com.br/ns0fjIx";

const CheckoutTestPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8 bg-background text-foreground">
    <h1 className="font-playfair text-3xl font-bold">Teste do Link de Checkout</h1>
    <p className="font-inter text-muted-foreground max-w-md text-center">
      Use os elementos abaixo para verificar se o link de checkout está acessível.
    </p>
    <code className="bg-muted px-4 py-2 rounded text-sm select-all">{CHECKOUT_URL}</code>
    <div className="flex flex-col sm:flex-row gap-4">
      <a
        href={CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center h-12 px-8 rounded-sm bg-foreground text-background font-playfair font-bold tracking-widest uppercase text-sm hover:opacity-90 transition-opacity"
      >
        Abrir em nova aba
      </a>
      <button
        onClick={() => navigator.clipboard.writeText(CHECKOUT_URL)}
        className="inline-flex items-center justify-center h-12 px-8 rounded-sm border border-foreground/20 font-inter text-sm hover:bg-foreground/5 transition-colors"
      >
        Copiar link
      </button>
    </div>
    <iframe
      src={CHECKOUT_URL}
      title="Preview do checkout"
      className="w-full max-w-2xl h-[500px] border border-border rounded-md mt-4"
      sandbox="allow-scripts allow-same-origin allow-forms"
    />
  </div>
);

export default CheckoutTestPage;
