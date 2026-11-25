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
    { cliente: 'Usina Santa Maria — Bioenergia', titulo: 'Subestação elevadora 13,8/69 kV (30 MVA) e LD 69 kV', local: 'Medeiros Neto/BA', ano: 'Em andamento', foto: 'obra-medeiros-neto.webp',
      texto: 'Projetos executivos, montagem eletromecânica e elétrica da subestação elevadora de 30 MVA e construção de 1,2 km de linha de distribuição em 69 kV (circuito simples, estruturas de concreto) até a subestação de chaveamento da COELBA, com comissionamento e operação assistida.' }
  ],
  /* tipo: 'se' = subestação | 'lt' = linha de transmissão/distribuição
     fotos: galeria extra (arquivos em assets/img), aparece em "Ver detalhes" */
  concluidos: [
    { tipo: 'se', cliente: 'Equatorial', titulo: 'Nova Subestação Gruta', local: 'Maceió/AL', ano: 'Concluído', foto: 'obra-050.webp', fotos: ['obra-052.webp'],
      texto: 'Construção de nova subestação.' },
    { tipo: 'se', cliente: 'Equatorial', titulo: 'Ampliação da SE Guaíba 1', local: 'Guaíba/RS', ano: 'Concluído', foto: 'obra-048.webp',
      texto: 'Ampliação de subestação.' },
    { tipo: 'lt', cliente: 'Furnas · EDP', titulo: 'LD 138 kV Viana II (16,8 km)', local: 'Viana, Cariacica e Vila Velha/ES', ano: '2024', foto: 'obra-ld-viana2.webp',
      texto: 'Obra civil e montagem eletromecânica da linha de distribuição que interliga a SE Viana II (Furnas) às subestações Caçaroca e IBS (EDP), com fundações especiais em estacas e tubulões, montagem das estruturas metálicas e lançamento de condutores e cabos para-raios OPGW.' },
    { tipo: 'se', cliente: 'Brametal', titulo: 'SE Brametal 7,5 MVA 138/15 kV', local: 'Linhares/ES', ano: '2024', foto: 'obra-brametal.webp',
      texto: 'Regime turnkey: projetos civis, eletromecânicos e elétricos, compras de materiais e equipamentos, obras civis, montagem eletromecânica e elétrica, automação, comissionamento e operação assistida, além das redes de média tensão em 15 kV para as novas demandas da fábrica.' },
    { tipo: 'se', cliente: 'ArcelorMittal', titulo: 'Estação Recebedora 4 — ampliação e 2º barramento 138 kV', local: 'Serra/ES', ano: 'Concluído', foto: 'h/er4-1.webp',
      texto: 'Turnkey da ampliação da ER4 com segundo barramento de 138 kV: projetos, obras civis, compras de equipamentos e materiais, montagem eletromecânica e elétrica e comissionamento. Inclui o lançamento de cabos 185 mm² 8,7/15 kV da subestação de Utilidades para a sala elétrica do Despoeiramento Secundário.' },
    { tipo: 'se', cliente: 'Carta Fabril', titulo: 'Subestação da planta de papel com interligação à LT 138 kV da Light', local: 'Piraí/RJ', ano: 'Concluído', foto: 'h/cartafabril-1.webp', fotos: ['h/cartafabril-1.webp','h/cartafabril-2.webp','h/cartafabril-3.webp'],
      texto: 'Turnkey: projeto executivo completo da subestação, terraplanagem, obras civis e montagem eletromecânica, estudos de seletividade e curto-circuito e interligação com a linha de transmissão de 138 kV da Light.' },
    { tipo: 'lt', cliente: 'EDP', titulo: 'LD 69 kV Iúna x Ibatiba (12,5 km)', local: 'Iúna e Ibatiba/ES', ano: 'Concluído', foto: 'h/iuna-1.webp', fotos: ['h/iuna-1.webp','h/iuna-2.webp','h/iuna-3.webp'],
      texto: 'Turnkey para a EDP: projeto, obra civil e montagem eletromecânica de 12,5 km de linha de distribuição em 69 kV com estruturas metálicas.' },
    { tipo: 'se', cliente: 'Grupo Biancogrês', titulo: '2º transformador 138 kV e subestação de medição e abaixadora', local: 'Espírito Santo', ano: 'Concluído', foto: 'h/biancogres-1.webp',
      texto: 'Obras civis e elétricas da subestação de medição e abaixadora e, em nova etapa, instalação do 2º transformador de 138 kV: projeto, compras de equipamentos e materiais, montagem eletromecânica e comissionamento.' },
    { tipo: 'se', cliente: 'Avesui Qualitti', titulo: 'SE 69/34,5 kV 15 MVA e LT 69 kV “truspole” (5 km)', local: 'Morrinhos/GO', ano: '2020', foto: 'h/qualitti-1.webp', fotos: ['h/qualitti-1.webp','h/qualitti-2.webp','h/qualitti-3.webp','h/qualitti-4.webp'],
      texto: 'Projeto da subestação 69/34,5 kV de 15 MVA e da linha de 69 kV em estruturas metálicas tipo “truspole” (5 km), interligando um TAP na LT Planalto–Morrinhos à SE Qualitti, com compras, obras civis, montagem eletromecânica e comissionamento.' },
    { tipo: 'lt', cliente: 'BBCA', titulo: 'LT 138 kV em estruturas “truspole” (10 km)', local: 'Maracaju/MS', ano: '2019', foto: 'obra-043.webp', fotos: ['h/bbca-1.webp','h/bbca-2.webp','h/bbca-3.webp','h/bbca-4.webp','h/bbca-5.webp'],
      texto: 'Projeto da linha de 138 kV em estruturas metálicas tipo “truspole” interligando a BBCA à SE Maracaju (Energisa), com diligenciamento de compras, obras civis e montagem eletromecânica.' },
    { tipo: 'se', cliente: 'Alcon — Açúcar e Álcool', titulo: 'Subestação elevatória 13,8/138 kV (50–60 MVA) e LT 138 kV (14 km)', local: 'Conceição da Barra e Pinheiros/ES', ano: '2018', foto: 'obra-005.webp', fotos: ['h/alcon-1.webp','h/alcon-2.webp','h/alcon-3.webp','h/alcon-4.webp','h/alcon-5.webp','h/alcon-6.webp','h/alcon-7.webp','h/alcon-8.webp','h/alcon-9.webp','h/alcon-10.webp','h/alcon-11.webp','h/alcon-12.webp','h/alcon-13.webp','h/alcon-14.webp','h/alcon-15.webp','h/alcon-16.webp','h/alcon-17.webp','h/alcon-18.webp'],
      texto: 'Montagem completa da SE elevatória a partir da terraplanagem, interligação do gerador (subterrânea e aérea em 13,8 kV), 14 km de LT 138 kV em estruturas de concreto com cabos 336,4 MCM e OPGW até o chaveamento da EDP, chaveamento completo padrão EDP com automação e teleproteção, comissionamento e operação assistida. Obra civil: malha de terra, bases, canaletas, drenagem, casa de comando, urbanização e parede corta-fogo.' },
    { tipo: 'se', cliente: 'Placas do Brasil', titulo: 'Subestação da planta de MDF (138/13,8 kV, 15 MVA)', local: 'Pinheiros/ES', ano: '2018', foto: 'obra-011.webp', fotos: ['h/placas-1.webp','h/placas-2.webp','h/placas-3.webp','h/placas-4.webp','h/placas-5.webp','h/placas-6.webp','h/placas-7.webp','h/placas-8.webp','h/placas-9.webp','h/placas-10.webp','h/placas-11.webp','h/placas-12.webp','h/placas-13.webp','h/placas-14.webp','h/placas-15.webp'],
      texto: 'Projeto executivo completo da subestação (civil e eletromecânico), estudos de curto-circuito e seletividade com aprovações na EDP, compras, montagem completa a partir da terraplanagem, rede subterrânea de 13,8 kV com transformadores a seco 13,8 kV/440 V, barramentos blindados e QGBTs, comissionamento e operação assistida. Obra civil: malha de terra, bases, canaletas, drenagem, casa de comando, urbanização e parede corta-fogo.' },
    { tipo: 'se', cliente: 'Placas do Brasil', titulo: 'Banco de capacitores 13,8 kV', local: 'Pinheiros/ES', ano: 'Concluído', foto: 'obra-010.webp', fotos: ['h/capacitores-1.webp','h/capacitores-2.webp','h/capacitores-3.webp'],
      texto: 'Projeto, obras civis, montagem eletromecânica e implantação de banco de capacitores de 13,8 kV.' },
    { tipo: 'se', cliente: 'GE — CTEEP', titulo: 'Ampliação SE Viana 2 345 kV — Lote 21', local: 'Viana/ES', ano: 'Concluído', foto: 'obra-012.webp', fotos: ['h/viana2-1.webp','h/viana2-2.webp','h/viana2-3.webp','h/viana2-4.webp'],
      texto: 'Interligação Elétrica Itaúnas: obras civis e montagem eletromecânica da SE Viana 2 em 345 kV, inclusive comissionamento.' },
    { tipo: 'lt', cliente: 'EDP', titulo: 'Recapacitações Ponto Belo–Montanha e Nova Venécia–Linhares', local: 'Norte do ES', ano: 'Concluído', foto: 'h/pontobelo-1.webp', fotos: ['h/pontobelo-1.webp','h/pontobelo-2.webp','h/pontobelo-3.webp','h/pontobelo-4.webp'],
      texto: 'Recapacitação da SE Ponto Belo de 34,5 para 69 kV (novo bay de 69 kV e desmontagem do antigo) e montagem de bay 69 kV na SE Montanha; recapacitação da LT Ponto Belo–Montanha (25 km) de 34,5 para 69 kV com projeto em linha viva; recapacitação da LT Nova Venécia–Linhares 138 kV (elevação de temperatura) com projeto; adequação da entrada da SE Linhares em 138 kV para a LT de Furnas.' },
    { tipo: 'lt', cliente: 'EDP', titulo: 'Ramais de LT 69 kV (UNIAVES) e 138 kV (Biancogrês)', local: 'Espírito Santo', ano: 'Concluído', foto: 'h/ramais-1.webp', fotos: ['h/ramais-1.webp','h/ramais-2.webp','h/ramais-3.webp','h/ramais-4.webp','h/ramais-5.webp','h/ramais-6.webp','h/ramais-7.webp'],
      texto: 'Construção do ramal de linha de 69 kV para atender o frigorífico UNIAVES e do ramal de 138 kV para atender a cerâmica Biancogrês.' },
    { tipo: 'se', cliente: 'EDP', titulo: 'SE Jerônimo Monteiro 69 kV', local: 'Jerônimo Monteiro/ES', ano: 'Concluído', foto: 'h/jeronimo-1.webp',
      texto: 'Serviços de montagem na subestação de 69 kV de Jerônimo Monteiro.' },
    { tipo: 'lt', cliente: 'EDP', titulo: 'LD 138 kV SD Domingos Martins – PCH São Pedro (4,5 km)', local: 'Domingos Martins/ES', ano: 'Concluído', foto: 'h/domingos-2.webp', fotos: ['h/domingos-1.webp','h/domingos-2.webp','h/domingos-3.webp','h/domingos-4.webp'],
      texto: 'Montagem de 4,5 km de linha de distribuição em 138 kV entre a SD Domingos Martins e a PCH São Pedro.' },
    { tipo: 'lt', cliente: 'EDP', titulo: 'LD 138 kV SD Linhares – SD Canivete (2,5 km)', local: 'Linhares/ES', ano: 'Concluído', foto: 'h/canivete-1.webp', fotos: ['h/canivete-1.webp','h/canivete-2.webp','h/canivete-3.webp','h/canivete-4.webp'],
      texto: 'Montagem e desmontagem de 2,5 km de linha de distribuição em 138 kV.' },
    { tipo: 'lt', cliente: 'EDP', titulo: 'LD 138 kV SD Rio Quartel – SD Linhares', local: 'Linhares/ES', ano: 'Concluído', foto: 'h/rioquartel-1.webp', fotos: ['h/rioquartel-1.webp','h/rioquartel-2.webp','h/rioquartel-3.webp','h/rioquartel-4.webp'],
      texto: 'Montagem e desmontagem de linha de distribuição em 138 kV entre a SD Rio Quartel e a SD Linhares.' }
  ],
  /* outras obras executadas (sem fotos): [tipo, título, local] */
  outras: [
    ['lt', 'Ramal 138 kV para a subestação do Estaleiro Jurong (3,5 km)', 'Aracruz/ES'],
    ['lt', 'Ramal 138 kV para a subestação Aracruz (1,6 km)', 'Aracruz/ES'],
    ['se', 'Ampliação da SE Linhares com bay de 138 kV para a LT Linhares–Cacimbas', 'Linhares/ES'],
    ['lt', 'Recuperação de estruturas da LT 230 kV (2,5 km) em Conselheiro Pena', 'Aimorés/MG'],
    ['se', '2 bancos de capacitores de 50 MVAr no setor de 138 kV da SE Atibaia II (CTEEP), com fornecimento de materiais', 'Atibaia/SP'],
    ['se', 'Subestação 138/13,8 kV 15 MVA e 2ª etapa com transformador de 7 MVA para a WEG', 'Linhares/ES']
  ],
  /* Mapa: estados atendidos. status "atual" = já atendemos; "futuro" = vamos atender */
  mapa: [
    { uf: 'ES', cidade: 'Serra — sede', lon: -40.31, lat: -20.13, status: 'sede' },
    { uf: 'MS', cidade: 'Maracaju', lon: -55.17, lat: -21.61, status: 'atual' },
    { uf: 'RS', cidade: 'Carlos Barbosa · Guaíba', lon: -51.4, lat: -29.7, status: 'atual' },
    { uf: 'AL', cidade: 'Maceió', lon: -35.73, lat: -9.65, status: 'atual' },
    { uf: 'BA', cidade: 'Medeiros Neto', lon: -41.3, lat: -13.2, status: 'atual' } /* lon/lat = posição do pino no mapa */,
    { uf: 'MG', cidade: 'Aimorés', lon: -44.6, lat: -18.3, status: 'atual' },
    { uf: 'RJ', cidade: 'Piraí', lon: -43.9, lat: -22.63, status: 'atual' },
    { uf: 'SP', cidade: 'Atibaia', lon: -46.55, lat: -23.12, status: 'atual' },
    { uf: 'GO', cidade: 'Morrinhos', lon: -49.1, lat: -17.73, status: 'atual' }
    /* exemplo de estado futuro:
    ,{ uf: 'BA', cidade: 'Salvador', lon: -38.5, lat: -12.97, status: 'futuro' } */
  ],
  /* clientes: [arquivo em assets/img/clientes (sem .webp), nome] */
  clientes: [['arcelormittal','ArcelorMittal'],['ge','GE'],['siemens','Siemens'],['equatorial','Grupo Equatorial'],['edp','EDP'],['weg','WEG'],['isa','ISA CTEEP'],['alstom','Alstom'],['cpfl','CPFL RGE'],['brametal','Brametal'],['placas','Placas do Brasil'],['alcon','Usina Alcon'],['biancogres','Grupo Biancogres'],['bbca','BBCA Brazil'],['cartafabril','Carta Fabril'],['qualitti','Qualitti'],['procisa','Procisa']]
};
