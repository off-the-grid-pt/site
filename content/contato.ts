/**
 * Dados de contacto da Off The Grid.
 *
 * ÚNICO SÍTIO a editar quando os dados reais existirem. Todo o site lê daqui.
 * Enquanto o valor for `null`, o link fica inerte e o texto mostra o marcador,
 * para nada ir para o ar a apontar para o vazio.
 */

export const WHATSAPP_URL: string | null = null; // ex: "https://wa.me/5511999999999"
export const WHATSAPP_NUMERO: string | null = null; // ex: "+55 11 99999-9999"
export const EMAIL: string | null = null; // ex: "contato@offthegrid.com.br"
export const CNPJ: string | null = null;

export const REDES: { label: string; url: string | null }[] = [
  { label: "Instagram", url: null },
  { label: "Behance", url: null },
  { label: "LinkedIn", url: null },
];

/** Devolve um href seguro: o valor real, ou a âncora da chamada final. */
export function href(valor: string | null, fallback = "#contato") {
  return valor ?? fallback;
}

/** Devolve o texto a mostrar: o valor real, ou o marcador de pendência. */
export function texto(valor: string | null, marcador: string) {
  return valor ?? `[INSERIR: ${marcador}]`;
}
