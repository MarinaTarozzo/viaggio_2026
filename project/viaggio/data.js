/* VIAGGIO — dados reais do roteiro (derivados de roteiro-completo-mvp.json)
   Regra aplicada: hotel da noite = cidade onde se dorme (corrigido vs. JSON bruto). */
window.VIAGGIO = (function () {
  const MAPA_URL = "https://maps.app.goo.gl/DRUELgQp6tvGzj7M8";

  const resumo = {
    titulo: "Itália · Eslovênia · Hungria · Áustria",
    dataInicio: "2026-06-29",
    dataFim: "2026-07-14",
    totalDias: 16,
    totalKm: 2091,
    paises: 4,
    cidades: 7,
    pessoas: ["Ana Paula", "Fernando", "Mariana", "Pedro", "Marina"],
  };

  // ---- Cidades (ordem da rota) ----
  const cidades = [
    {
      id: "milao", nome: "Milão", pais: "Itália", bandeira: "IT",
      datas: "30 jun – 2 jul  ·  12 – 14 jul", noites: 5,
      resumo: "Base de chegada e de partida. Duomo, Galleria, aperitivo nos Navigli e o retorno final antes do voo.",
      stays: [
        { hotel: "Canova Hotel", periodo: "30 jun – 2 jul", status: "pago", cobranca: "25/06",
          endereco: "Via Giulio Uberti, 6 — Milão", link: "https://www.booking.com/hotel/it/canovahotel.pt-pt.html",
          obs: "Pagamento confirmado em 25/06. 3 quartos." },
        { hotel: "IH Hotels Milano Centrale", periodo: "12 – 14 jul", status: "pago", cobranca: "07/07",
          endereco: "Via Napo Torriani — Milão", link: "https://www.booking.com/Share-DnJGZHa",
          obs: "Última base antes do voo de volta." },
      ],
      passeios: [
        { nome: "Terraços do Duomo", categoria: "Vista bonita" },
        { nome: "Galleria Vittorio Emanuele II", categoria: "Passeio ao ar livre" },
      ],
      rating: 4.6, ratingN: 5,
    },
    {
      id: "trieste", nome: "Trieste", pais: "Itália", bandeira: "IT",
      datas: "2 – 3 jul", noites: 1,
      resumo: "Parada à beira do Adriático no caminho para a Eslovênia. Praça Unità d'Italia e cafés históricos.",
      stays: [
        { hotel: "Mura 5&7", periodo: "2 – 3 jul", status: "verificar", cobranca: "",
          endereco: "Centro histórico — Trieste", link: "https://www.booking.com/hotel/it/mura-5-amp-7.pt-br.html",
          obs: "Pagamento na chegada. Confirmar valor no check-in." },
      ],
      passeios: [{ nome: "Piazza Unità d'Italia", categoria: "Vista bonita" }],
      rating: 4.2, ratingN: 3,
    },
    {
      id: "liubliana", nome: "Liubliana", pais: "Eslovênia", bandeira: "SI",
      datas: "3 – 4 jul", noites: 1,
      resumo: "Capital pequena e charmosa. A caverna de Postojna já está reservada no caminho.",
      stays: [
        { hotel: "City Hotel Ljubljana", periodo: "3 – 4 jul", status: "verificar", cobranca: "",
          endereco: "Dalmatinova ulica — Liubliana", link: "https://www.booking.com/hotel/si/cityhotelljubljana.pt-br.html",
          obs: "Pagamento na chegada." },
      ],
      passeios: [
        { nome: "Postojna Cave", categoria: "Passeio ao ar livre", reservado: true,
          link: "https://www.youtube.com/watch?v=CW6XmnLG3_0" },
        { nome: "Centro velho & Castelo", categoria: "Passeio ao ar livre" },
      ],
      rating: 4.5, ratingN: 4,
    },
    {
      id: "budapeste", nome: "Budapeste", pais: "Hungria", bandeira: "HU",
      datas: "4 – 7 jul", noites: 3,
      resumo: "Três noites na cidade dos banhos termais, do Parlamento e das pontes sobre o Danúbio.",
      stays: [
        { hotel: "Art Butik Hotel", periodo: "4 – 7 jul", status: "pago", cobranca: "29/06",
          endereco: "Distrito VII — Budapeste", link: "https://www.booking.com/hotel/hu/butik-art-design.pt-br.html",
          obs: "Pago em 29/06. 3 quartos, 3 noites." },
      ],
      passeios: [
        { nome: "Banhos Termais Széchenyi", categoria: "Experiência" },
        { nome: "Mercado Central", categoria: "Loja" },
      ],
      rating: 4.7, ratingN: 5,
    },
    {
      id: "viena", nome: "Viena", pais: "Áustria", bandeira: "AT",
      datas: "7 – 10 jul", noites: 3,
      resumo: "Palácios, cafés vienenses e música. Três noites para explitar com calma.",
      stays: [
        { hotel: "The Weekend Hotel", periodo: "7 – 10 jul", status: "verificar", cobranca: "",
          endereco: "Viena — Áustria", link: "https://www.booking.com/hotel/at/allalenz.pt-br.html",
          obs: "Pagamento na chegada. Nota de avaliação alta (90+)." },
      ],
      passeios: [
        { nome: "Palácio de Schönbrunn", categoria: "Museu" },
        { nome: "Café Central", categoria: "Café / doce" },
      ],
      rating: 4.6, ratingN: 5,
    },
    {
      id: "hallstatt", nome: "Hallstatt", pais: "Áustria", bandeira: "AT",
      datas: "10 – 11 jul", noites: 1,
      resumo: "O vilarejo alpino à beira do lago. Uma noite para o cartão-postal mais famoso da viagem.",
      stays: [
        { hotel: "Seehotel am Hallstättersee", periodo: "10 – 11 jul", status: "pago", cobranca: "23/06",
          endereco: "À beira do lago — Hallstatt", link: "https://www.booking.com/hotel/at/seehotel-am-hallstattersee.pt-br.html",
          obs: "Pago em 23/06. Vista para o lago." },
      ],
      passeios: [{ nome: "Skywalk & mirante do lago", categoria: "Vista bonita" }],
      rating: 4.8, ratingN: 4,
    },
    {
      id: "caprile", nome: "Caprile", pais: "Itália", bandeira: "IT",
      datas: "11 – 12 jul", noites: 1,
      resumo: "Coração das Dolomitas, junto ao Lago di Alleghe. Hotel de família desde 1866.",
      stays: [
        { hotel: "Hotel Alla Posta — Famiglia Pra (1866)", periodo: "11 – 12 jul", status: "pago", cobranca: "24/06",
          endereco: "Caprile / Alleghe — Dolomitas", link: "https://www.booking.com/hotel/it/alla-posta-alleghe.pt-br.html",
          obs: "Pago em 24/06. Hotel histórico de família." },
      ],
      passeios: [{ nome: "Lago di Alleghe ao pôr do sol", categoria: "Vista bonita" }],
      rating: 4.4, ratingN: 3,
    },
  ];

  const cidadePorId = Object.fromEntries(cidades.map((c) => [c.id, c]));

  // ---- Roteiro dia a dia (16 dias) ----
  // tipo: 'partida' | 'estrada' | 'cidade' | 'retorno'
  const dias = [
    { dia: 1, data: "2026-06-29", semana: "segunda", cidadeId: null, cidadeNoite: "São Paulo", tipo: "partida",
      nota: "Saída de São Paulo à tarde. Voo noturno rumo a Milão." },
    { dia: 2, data: "2026-06-30", semana: "terça", cidadeId: "milao", cidadeNoite: "Milão", tipo: "cidade",
      hotel: "Canova Hotel", nota: "Chegada e primeiro dia em Milão." },
    { dia: 3, data: "2026-07-01", semana: "quarta", cidadeId: "milao", cidadeNoite: "Milão", tipo: "cidade",
      hotel: "Canova Hotel", nota: "Dia livre em Milão." },
    { dia: 4, data: "2026-07-02", semana: "quinta", cidadeId: "trieste", cidadeNoite: "Trieste", tipo: "estrada",
      hotel: "Mura 5&7", estrada: { origem: "Milão", destino: "Trieste", km: 416, tempo: "4h43" } },
    { dia: 5, data: "2026-07-03", semana: "sexta", cidadeId: "liubliana", cidadeNoite: "Liubliana", tipo: "estrada",
      hotel: "City Hotel Ljubljana", estrada: { origem: "Trieste", destino: "Liubliana", km: 95, tempo: "1h18" },
      nota: "Postojna Cave reservada no caminho." },
    { dia: 6, data: "2026-07-04", semana: "sábado", cidadeId: "budapeste", cidadeNoite: "Budapeste", tipo: "estrada",
      hotel: "Art Butik Hotel", estrada: { origem: "Liubliana", destino: "Budapeste", km: 466, tempo: "4h45" } },
    { dia: 7, data: "2026-07-05", semana: "domingo", cidadeId: "budapeste", cidadeNoite: "Budapeste", tipo: "cidade",
      hotel: "Art Butik Hotel", nota: "Dia livre em Budapeste." },
    { dia: 8, data: "2026-07-06", semana: "segunda", cidadeId: "budapeste", cidadeNoite: "Budapeste", tipo: "cidade",
      hotel: "Art Butik Hotel", nota: "Dia livre em Budapeste." },
    { dia: 9, data: "2026-07-07", semana: "terça", cidadeId: "viena", cidadeNoite: "Viena", tipo: "estrada",
      hotel: "The Weekend Hotel", estrada: { origem: "Budapeste", destino: "Viena", km: 250, tempo: "2h46" } },
    { dia: 10, data: "2026-07-08", semana: "quarta", cidadeId: "viena", cidadeNoite: "Viena", tipo: "cidade",
      hotel: "The Weekend Hotel", nota: "Dia livre em Viena." },
    { dia: 11, data: "2026-07-09", semana: "quinta", cidadeId: "viena", cidadeNoite: "Viena", tipo: "cidade",
      hotel: "The Weekend Hotel", nota: "Dia livre em Viena." },
    { dia: 12, data: "2026-07-10", semana: "sexta", cidadeId: "hallstatt", cidadeNoite: "Hallstatt", tipo: "estrada",
      hotel: "Seehotel am Hallstättersee", estrada: { origem: "Viena", destino: "Hallstatt", km: 276, tempo: "3h10" } },
    { dia: 13, data: "2026-07-11", semana: "sábado", cidadeId: "caprile", cidadeNoite: "Caprile", tipo: "estrada",
      hotel: "Hotel Alla Posta", estrada: { origem: "Hallstatt", destino: "Caprile", km: 302, tempo: "4h28" } },
    { dia: 14, data: "2026-07-12", semana: "domingo", cidadeId: "milao", cidadeNoite: "Milão", tipo: "estrada",
      hotel: "IH Hotels Milano Centrale", estrada: { origem: "Caprile", destino: "Milão", km: 286, tempo: "3h15" },
      nota: "Volta às Dolomitas e descida para Milão." },
    { dia: 15, data: "2026-07-13", semana: "segunda", cidadeId: "milao", cidadeNoite: "Milão", tipo: "cidade",
      hotel: "IH Hotels Milano Centrale", nota: "Último dia inteiro — compras e despedida." },
    { dia: 16, data: "2026-07-14", semana: "terça", cidadeId: null, cidadeNoite: "Volta para casa", tipo: "retorno",
      nota: "Voo de volta ao Brasil." },
  ];

  // ---- Sugestões da família (simuladas, plausíveis) ----
  const sugestoes = [
    { id: "s1", nome: "Banhos Termais Széchenyi", categoria: "Experiência", cidadeId: "budapeste",
      quem: "Ana Paula", votos: 5, votantes: ["Ana Paula","Fernando","Mariana","Pedro","Marina"],
      motivo: "Os maiores banhos termais da Europa, lindos ao entardecer.",
      link: "https://www.szechenyibath.hu/" },
    { id: "s2", nome: "Aperitivo nos Navigli", categoria: "Experiência", cidadeId: "milao",
      quem: "Fernando", votos: 5, votantes: ["Ana Paula","Fernando","Pedro","Marina","Mariana"],
      motivo: "Spritz à beira do canal antes do jantar. Clima de verão italiano.", link: "" },
    { id: "s3", nome: "Postojna Cave", categoria: "Passeio ao ar livre", cidadeId: "liubliana",
      quem: "Pedro", votos: 4, votantes: ["Pedro","Mariana","Fernando","Marina"],
      motivo: "Caverna gigante com trenzinho — já reservamos!", reservado: true,
      link: "https://www.youtube.com/watch?v=CW6XmnLG3_0" },
    { id: "s4", nome: "Palácio de Schönbrunn", categoria: "Museu", cidadeId: "viena",
      quem: "Mariana", votos: 4, votantes: ["Mariana","Ana Paula","Marina","Pedro"],
      motivo: "Os jardins e o labirinto valem a manhã inteira.", link: "" },
    { id: "s5", nome: "Café Central", categoria: "Café / doce", cidadeId: "viena",
      quem: "Ana Paula", votos: 3, votantes: ["Ana Paula","Mariana","Marina"],
      motivo: "Café histórico com Sachertorte. Levar a vovó.", link: "" },
    { id: "s6", nome: "Terraços do Duomo", categoria: "Vista bonita", cidadeId: "milao",
      quem: "Marina", votos: 3, votantes: ["Marina","Fernando","Pedro"],
      motivo: "Subir no terraço entre as agulhas de mármore.", link: "" },
    { id: "s7", nome: "Lago di Alleghe ao pôr do sol", categoria: "Vista bonita", cidadeId: "caprile",
      quem: "Fernando", votos: 2, votantes: ["Fernando","Ana Paula"],
      motivo: "As Dolomitas refletidas na água. Foto da viagem.", link: "" },
    { id: "s8", nome: "Mercado Central de Budapeste", categoria: "Loja", cidadeId: "budapeste",
      quem: "Marina", votos: 2, votantes: ["Marina","Mariana"],
      motivo: "Páprica, lembrancinhas e lángos no andar de cima.", link: "" },
  ];

  // ---- Links úteis ----
  const links = [
    { titulo: "Reservas de hotéis", desc: "Pasta no Drive com todas as reservas", icone: "bed",
      url: "https://drive.google.com/drive/folders/1CFKamwdb4cwshhaIpAVAVjZdX6ie2MU-?usp=drive_link" },
    { titulo: "Reserva do carro", desc: "Documento de aluguel do veículo", icone: "car",
      url: "https://drive.google.com/drive/folders/1XnTDG0PT8e4hiy4U6McPEYLeRf5N_PwD?usp=drive_link" },
    { titulo: "Planilha do roteiro", desc: "Roteiro e hotéis completos", icone: "sheet",
      url: "https://docs.google.com/spreadsheets/d/1R6gcvyeLMhkwDLGlAFunO8KiKChJKJq5RIbXh3UyMwQ/edit?usp=sharing" },
    { titulo: "Mapa da viagem", desc: "Rota completa no Google Maps", icone: "map", url: MAPA_URL },
  ];

  // categorias para o formulário e filtros
  const categorias = ["Restaurante","Café / doce","Museu","Loja","Vista bonita","Experiência","Passeio ao ar livre","Parada de estrada","Outro"];

  return { MAPA_URL, resumo, cidades, cidadePorId, dias, sugestoes, links, categorias };
})();
