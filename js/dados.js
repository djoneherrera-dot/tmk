/* ============================================================
   DADOS DO SITE TMK — edite aqui para incluir novos projetos
   ------------------------------------------------------------
   Para adicionar um projeto: copie um bloco { ... }, cole na
   lista certa (andamento ou concluidos) e troque os textos.
   foto: arquivo dentro de assets/img (ou deixe "" se não tiver)
   ============================================================ */
window.TMK = {
  whatsapp: '5527997442843',
  andamento: [
    { cliente: 'ArcelorMittal', titulo: 'Road Map FOX 4', local: 'Serra/ES', ano: 'Em andamento', foto: 'obra-045.webp',
      texto: 'Adequações de bases civis e montagem eletromecânica.' },
    { cliente: 'ArcelorMittal', titulo: 'Expansão do sistema elétrico 138/13,8 kV — Estação Recebedora 4', local: 'Serra/ES', ano: 'Em andamento', foto: 'obra-047.webp',
      texto: 'Fornecimento turnkey de engenharia, equipamentos, montagem, testes, comissionamento e treinamento, com relocação e repotenciação de duas linhas de transmissão de 138 kV provenientes da ER-3 e integração com a Estação Recebedora 4.' },
    { cliente: 'ArcelorMittal', titulo: 'Expansão do sistema direto da ETA do LTQ', local: 'Serra/ES', ano: 'Em andamento', foto: 'obra-021.webp',
      texto: 'Fornecimento e instalação de uma nova coluna de disjuntores em 3,45 kV para atender a expansão da estação de tratamento de água do LTQ da ArcelorMittal Tubarão.' },
    { cliente: 'ArcelorMittal', titulo: 'Road Map repotenciação de disjuntores', local: 'Serra/ES', ano: 'Em andamento', foto: 'obra-013.webp',
      texto: 'Turnkey de engenharia detalhada, equipamentos, montagem, testes e comissionamento da expansão em 13,8 kV, com quatro novos painéis de entrada (Utilidades, Sinterização e Aciaria).' },
    { cliente: 'ArcelorMittal', titulo: 'Migração de MLCs e PD13 para a SE Aciaria 3', local: 'Serra/ES', ano: 'Em andamento', foto: 'obra-022.webp',
      texto: 'Turnkey de projetos, equipamentos, infraestrutura, testes e comissionamento da ampliação da SE 3 Aciaria, com novo barramento de 13,8 kV (Barra 4) interligado à Barra 3.' },
    { cliente: 'CPFL', titulo: 'Construção LD Ramal Carlos Barbosa 2', local: 'Carlos Barbosa/RS', ano: 'Em andamento', foto: 'obra-042.webp',
      texto: 'Construção de linha de distribuição.' },
    { cliente: 'Equatorial', titulo: 'Ampliação da SE Guaíba 1', local: 'Guaíba/RS', ano: 'Em andamento', foto: 'obra-048.webp',
      texto: 'Ampliação de subestação.' },
    { cliente: 'Equatorial', titulo: 'Nova Subestação Gruta', local: 'Maceió/AL', ano: 'Em andamento', foto: 'obra-050.webp',
      texto: 'Construção de nova subestação.' },
    { cliente: 'Usina Santa Maria — Bioenergia', titulo: 'Subestação elevadora 13,8/69 kV (30 MVA) e LD 69 kV', local: 'Medeiros Neto/BA', ano: 'Em andamento', foto: 'obra-medeiros-neto.webp',
      texto: 'Projetos executivos, montagem eletromecânica e elétrica da subestação elevadora de 30 MVA e construção de 1,2 km de linha de distribuição em 69 kV (circuito simples, estruturas de concreto) até a subestação de chaveamento da COELBA, com comissionamento e operação assistida.' }
  ],
  concluidos: [
    { cliente: 'Placas do Brasil', titulo: 'Subestação da planta de MDF', local: 'Pinheiros/ES', ano: '2018', foto: 'obra-011.webp',
      texto: 'Projeto executivo completo da subestação (civil e eletromecânico), estudos de curto-circuito e seletividade, aprovações junto à EDP, rede subterrânea de 13,8 kV, montagem de transformadores, barramentos e QGBTs, comissionamento e operação assistida.' },
    { cliente: 'Alcon — Açúcar e Álcool', titulo: 'Subestação elevatória 13,8/138 kV (50–60 MVA)', local: 'Conceição da Barra e Pinheiros/ES', ano: '2018', foto: 'obra-005.webp',
      texto: 'Obras civis, interligação do gerador, 14 km de linha de transmissão em 138 kV, chaveamento padrão EDP, automação, teleproteção, comissionamento e operação assistida.' },
    { cliente: 'GE — CTEEP', titulo: 'Ampliação SE Viana 2 345 kV — Lote 21', local: 'Viana/ES', ano: 'Concluído', foto: 'obra-012.webp',
      texto: 'Interligação Elétrica Itaúnas: obras civis e montagem eletromecânica da SE Viana 2 em 345 kV.' },
    { cliente: 'BBCA', titulo: 'LT 138 kV em estruturas “truspole” (10 km)', local: 'Maracaju/MS', ano: 'Concluído', foto: 'obra-043.webp',
      texto: 'Linha interligando a BBCA à SE Maracaju (Energisa), com diligenciamento de compras, obras civis e montagem eletromecânica.' },
    { cliente: 'Placas do Brasil', titulo: 'Banco de capacitores 13,8 kV', local: 'Pinheiros/ES', ano: 'Concluído', foto: 'obra-010.webp',
      texto: 'Projeto, obras civis, montagem eletromecânica e implantação de banco de capacitores de 13,8 kV.' },
    { cliente: 'Brametal', titulo: 'SE Brametal 7,5 MVA 138/15 kV', local: 'Linhares/ES', ano: '2024', foto: 'obra-brametal.webp',
      texto: 'Regime turnkey: projetos civis, eletromecânicos e elétricos, compras de materiais e equipamentos, obras civis, montagem eletromecânica e elétrica, automação, comissionamento e operação assistida, além das redes de média tensão em 15 kV para as novas demandas da fábrica.' },
    { cliente: 'Furnas · EDP', titulo: 'LD 138 kV Viana II (16,8 km)', local: 'Viana, Cariacica e Vila Velha/ES', ano: '2024', foto: 'obra-ld-viana2.webp',
      texto: 'Obra civil e montagem eletromecânica da linha de distribuição que interliga a SE Viana II (Furnas) às subestações Caçaroca e IBS (EDP), com fundações especiais em estacas e tubulões, montagem das estruturas metálicas e lançamento de condutores e cabos para-raios OPGW.' },
    { cliente: 'ArcelorMittal', titulo: 'Estação Recebedora 4', local: 'Serra/ES', ano: 'Concluído', foto: 'obra-052.webp',
      texto: 'Regime turnkey completo e lançamento de cabos 185 mm² 8,7/15 kV da subestação de Utilidades para a sala elétrica do Despoeiramento Secundário.' }
  ],
  /* Mapa: estados atendidos. status "atual" = já atendemos; "futuro" = vamos atender */
  mapa: [
    { uf: 'ES', cidade: 'Serra — sede', lon: -40.31, lat: -20.13, status: 'sede' },
    { uf: 'MS', cidade: 'Maracaju', lon: -55.17, lat: -21.61, status: 'atual' },
    { uf: 'RS', cidade: 'Carlos Barbosa · Guaíba', lon: -51.4, lat: -29.7, status: 'atual' },
    { uf: 'AL', cidade: 'Maceió', lon: -35.73, lat: -9.65, status: 'atual' },
    { uf: 'BA', cidade: 'Medeiros Neto', lon: -40.22, lat: -17.37, status: 'atual' }
    /* exemplo de estado futuro:
    ,{ uf: 'BA', cidade: 'Salvador', lon: -38.5, lat: -12.97, status: 'futuro' } */
  ],
  /* clientes: [arquivo em assets/img/clientes (sem .webp), nome] */
  clientes: [['arcelormittal','ArcelorMittal'],['ge','GE'],['siemens','Siemens'],['equatorial','Grupo Equatorial'],['edp','EDP'],['weg','WEG'],['isa','ISA CTEEP'],['alstom','Alstom'],['cpfl','CPFL RGE'],['brametal','Brametal'],['placas','Placas do Brasil'],['alcon','Usina Alcon'],['biancogres','Grupo Biancogres'],['bbca','BBCA Brazil']]
};
