// Places shown in the camp explorer, in the order of a typical guided visit.
// at: the OpenStreetMap name the place is anchored to (see plans.json "named").
// kind: orig = original building, ruin, recon = partly rebuilt after the war, mem = memorial, area = camp sector.
// Facts follow the Auschwitz Memorial's history pages (auschwitz.org/en/history) unless a source is given.

const M = "https://www.auschwitz.org/en/history/";
const SRC = {
  a1: ["Auschwitz Memorial – Auschwitz I", M + "auschwitz-i/"],
  a2: ["Auschwitz Memorial – Auschwitz II-Birkenau", M + "auschwitz-ii/"],
  shoah: ["Auschwitz Memorial – Auschwitz and the Shoah", M + "auschwitz-and-shoah/"],
  b11: ["Auschwitz Memorial – Block 11", M + "punishments-and-executions/block-11"],
  shoot: ["Auschwitz Memorial – Shooting", M + "punishments-and-executions/shooting"],
  hang: ["Auschwitz Memorial – Hanging", M + "punishments-and-executions/hanging"],
  med: ["Auschwitz Memorial – Medical experiments", M + "medical-experiments/"],
  res: ["Auschwitz Memorial – Resistance", M + "resistance/"],
  life: ["Auschwitz Memorial – Life in the camp", M + "life-in-the-camp/"],
  kids: ["Auschwitz Memorial – The fate of children", M + "fate-of-children/"],
  roma: ["Auschwitz Memorial – Sinti and Roma in Auschwitz", M + "categories-of-prisoners/sinti-and-roma-in-auschwitz/"],
  jews: ["Auschwitz Memorial – Jews in Auschwitz", M + "categories-of-prisoners/jews-in-auschwitz/"],
  anne: ["Anne Frank House – Who was Anne Frank?", "https://www.annefrank.org/en/anne-frank/who-was-anne-frank/"],
  f50: ["50faces.lu – Jewish lives from Luxembourg", "https://www.50faces.lu/"]
};

export const SITES = {
  a1: {
    t: {en: "Auschwitz I – main camp", de: "Auschwitz I – Stammlager", fr: "Auschwitz I – camp principal", lb: "Auschwitz I – Stammlager"},
    intro: {
      en: "The SS set up the first camp in June 1940 in former Polish army barracks. The first transport, Polish political prisoners, arrived on 14 June 1940. Today the Museum’s main exhibitions are in the brick blocks. You visit it on Saturday morning.",
      de: "Die SS richtete das erste Lager im Juni 1940 in ehemaligen Kasernen der polnischen Armee ein. Der erste Transport mit polnischen politischen Häftlingen kam am 14. Juni 1940 an. Heute sind in den Backsteinblöcken die Hauptausstellungen des Museums. Du besuchst es am Samstagvormittag.",
      fr: "Les SS ont installé le premier camp en juin 1940 dans d’anciennes casernes de l’armée polonaise. Le premier convoi, des prisonniers politiques polonais, est arrivé le 14 juin 1940. Aujourd’hui, les blocs de briques abritent les principales expositions du musée. Vous le visitez samedi matin.",
      lb: "D’SS huet dat éischt Lager am Juni 1940 an ale Kasären vun der polnescher Arméi ageriicht. Den éischten Transport, polnesch politesch Prisonéier, ass de 14. Juni 1940 ukomm. Haut sinn an de Bréckeblécken d’Haaptausstellunge vum Musée. Du besichs et e Samschdeg de Moien."
    }
  },
  bk: {
    t: {en: "Auschwitz II – Birkenau", de: "Auschwitz II – Birkenau", fr: "Auschwitz II – Birkenau", lb: "Auschwitz II – Birkenau"},
    intro: {
      en: "Built from October 1941, 3 km from the main camp, and many times larger. Most of the at least 1.1 million people murdered at Auschwitz died here, about 1 million of them Jews. The SS blew up the gas chambers and burned many barracks before leaving in January 1945. You visit it on Sunday morning.",
      de: "Ab Oktober 1941 gebaut, 3 km vom Stammlager entfernt und um ein Vielfaches größer. Die meisten der mindestens 1,1 Millionen in Auschwitz ermordeten Menschen starben hier, etwa 1 Million von ihnen Juden. Vor ihrem Abzug im Januar 1945 sprengte die SS die Gaskammern und brannte viele Baracken nieder. Du besuchst es am Sonntagvormittag.",
      fr: "Construit à partir d’octobre 1941, à 3 km du camp principal, et bien plus vaste. La plupart des au moins 1,1 million de personnes assassinées à Auschwitz sont mortes ici, dont environ 1 million de Juifs. Avant de partir en janvier 1945, les SS ont dynamité les chambres à gaz et incendié de nombreux baraquements. Vous le visitez dimanche matin.",
      lb: "Ab Oktober 1941 gebaut, 3 km vum Stammlager ewech a vill méi grouss. Déi meescht vun de mindestens 1,1 Millioune Mënschen, déi zu Auschwitz ermord goufen, sinn hei gestuerwen, ronn 1 Millioun dovu Judden. Ier se am Januar 1945 fort sinn, huet d’SS d’Gaskummere gesprengt a vill Baracken ofgebrannt. Du besichs et e Sonndeg de Moien."
    }
  }
};

export const PLACES = {
  a1: [
    {id: "gate", at: "Brama Obozu \"Arbeit macht frei\"", kind: "orig",
     t: {en: "The gate: “Arbeit macht frei”", de: "Das Tor: „Arbeit macht frei“", fr: "Le portail : « Arbeit macht frei »", lb: "D’Paart: „Arbeit macht frei“"},
     then: {
      en: "The entrance to the main camp. The slogan, “Work sets you free”, was a lie. Every morning the work details marched out through this gate to forced labour, and every evening they came back, often carrying those who had died during the day. A prisoner orchestra had to play nearby to keep the columns in step.",
      de: "Der Eingang zum Stammlager. Der Spruch „Arbeit macht frei“ war eine Lüge. Jeden Morgen marschierten die Arbeitskommandos durch dieses Tor zur Zwangsarbeit, jeden Abend kamen sie zurück und trugen oft die, die tagsüber gestorben waren. Ein Häftlingsorchester musste in der Nähe spielen, damit die Kolonnen im Gleichschritt gingen.",
      fr: "L’entrée du camp principal. La devise « Le travail rend libre » était un mensonge. Chaque matin, les kommandos de travail franchissaient ce portail vers le travail forcé ; chaque soir, ils revenaient, portant souvent ceux qui étaient morts dans la journée. Un orchestre de prisonniers devait jouer tout près pour que les colonnes marchent au pas.",
      lb: "D’Entrée vum Stammlager. De Spréch „Arbeit macht frei“ war eng Ligen. All Moien sinn d’Aarbechtskommandoen duerch dës Paart bei d’Zwangsaarbecht marschéiert, all Owend koumen se zréck an hunn dacks déi gedroen, déi am Laf vum Dag gestuerwe waren. En Orchester vu Prisonéier huet missen no dobäi spillen, fir datt d’Kolonnen am Schratt goungen."},
     today: {
      en: "The gate is original. The sign above it was stolen in December 2009 and found again, damaged; a copy hangs here now. Look at the letter B in “ARBEIT”: it is upside down. Prisoners made the sign in the camp workshop.",
      de: "Das Tor ist original. Der Schriftzug wurde im Dezember 2009 gestohlen und beschädigt wiedergefunden; heute hängt hier eine Kopie. Schau dir das B in „ARBEIT“ an: Es steht auf dem Kopf. Häftlinge haben den Schriftzug in der Lagerwerkstatt angefertigt.",
      fr: "Le portail est d’origine. L’inscription a été volée en décembre 2009 puis retrouvée, endommagée ; c’est une copie qui est accrochée aujourd’hui. Regardez le B de « ARBEIT » : il est à l’envers. Ce sont des prisonniers qui ont fabriqué l’inscription dans l’atelier du camp.",
      lb: "D’Paart ass original. De Schrëftzuch gouf am Dezember 2009 geklaut a beschiedegt erëmfonnt; haut hänkt hei eng Kopie. Kuck dir de B an „ARBEIT“ un: E steet op der Kopp. Prisonéier hunn de Schrëftzuch an der Lageratelier gemaach."},
     src: ["a1"]},

    {id: "b4", at: "Blok 4", kind: "orig",
     t: {en: "Block 4: “Extermination”", de: "Block 4: „Vernichtung“", fr: "Bloc 4 : « Extermination »", lb: "Block 4: „Vernichtung“"},
     then: {
      en: "One of the 28 brick blocks where prisoners lived, hundreds of them crowded into each building.",
      de: "Einer der 28 Backsteinblöcke, in denen die Häftlinge lebten, Hunderte zusammengepfercht in jedem Gebäude.",
      fr: "L’un des 28 blocs de briques où vivaient les prisonniers, entassés par centaines dans chaque bâtiment.",
      lb: "Ee vun den 28 Bréckeblécken, wou d’Prisonéier gelieft hunn, Honnerte gedrängt an all Gebai."},
     today: {
      en: "The exhibition on the extermination: maps of the deportations from all over Europe, an urn with ashes from Birkenau, a model of a gas chamber and crematorium, and a room with about two tonnes of human hair, which the SS shaved from the victims and sold to make cloth. Photography is not allowed in that room.",
      de: "Die Ausstellung über die Vernichtung: Karten der Deportationen aus ganz Europa, eine Urne mit Asche aus Birkenau, ein Modell einer Gaskammer mit Krematorium und ein Raum mit etwa zwei Tonnen Menschenhaar, das die SS den Opfern abschor und für die Herstellung von Stoff verkaufte. In diesem Raum ist Fotografieren verboten.",
      fr: "L’exposition sur l’extermination : cartes des déportations de toute l’Europe, une urne contenant des cendres de Birkenau, une maquette d’une chambre à gaz et d’un crématoire, et une salle avec environ deux tonnes de cheveux humains, que les SS rasaient aux victimes et vendaient pour fabriquer du tissu. Il est interdit de photographier dans cette salle.",
      lb: "D’Ausstellung iwwer d’Vernichtung: Kaarte vun den Deportatiounen aus ganz Europa, eng Urn mat Äsche vu Birkenau, e Modell vun enger Gaskummer mat Krematorium an e Raum mat ongeféier zwou Tonne Mënschenhoer, déi d’SS den Affer ofgeschier a verkaf huet, fir Stoff dovun ze maachen. An deem Raum däerf ee keng Fotoe maachen."},
     src: ["shoah"]},

    {id: "b5", at: "Blok 5", kind: "orig",
     t: {en: "Block 5: the evidence", de: "Block 5: die Beweise", fr: "Bloc 5 : les preuves", lb: "Block 5: d’Beweiser"},
     then: {
      en: "A prisoner block like the others. The deportees had been told they were being “resettled in the East”, so they brought what they thought they would need for a new life.",
      de: "Ein Häftlingsblock wie die anderen. Den Deportierten hatte man gesagt, sie würden „im Osten angesiedelt“, also nahmen sie mit, was sie für ein neues Leben zu brauchen glaubten.",
      fr: "Un bloc de prisonniers comme les autres. On avait dit aux déportés qu’ils allaient être « réinstallés à l’Est » ; ils avaient donc emporté ce qu’ils pensaient nécessaire à une nouvelle vie.",
      lb: "E Prisonéiersblock wéi déi aner. De Deportéierten hat een erzielt, si géifen „am Osten ugesiedelt“, also hu se matgeholl, wat se mengten, fir en neit Liewen ze brauchen."},
     today: {
      en: "What the SS took from them: mountains of shoes, suitcases with names and addresses painted on them, glasses, prostheses, brushes, pots and pans. Many visitors find this the hardest room.",
      de: "Was die SS ihnen abnahm: Berge von Schuhen, Koffer mit aufgemalten Namen und Adressen, Brillen, Prothesen, Bürsten, Töpfe und Pfannen. Für viele Besucher ist das der schwerste Raum.",
      fr: "Ce que les SS leur ont pris : des montagnes de chaussures, des valises où sont peints des noms et des adresses, des lunettes, des prothèses, des brosses, des casseroles. Pour beaucoup de visiteurs, c’est la salle la plus difficile.",
      lb: "Wat d’SS hinnen ofgeholl huet: Bierger vu Schong, Koffere mat opgemoolten Nimm an Adressen, Brëller, Prothesen, Biischten, Dëppen a Pannen. Fir vill Visiteuren ass dat de schwéierste Raum."},
     src: ["shoah"]},

    {id: "b6", at: "Blok 6", kind: "orig",
     t: {en: "Blocks 6 and 7: life in the camp", de: "Blöcke 6 und 7: das Leben im Lager", fr: "Blocs 6 et 7 : la vie au camp", lb: "Blocken 6 a 7: d’Liewen am Lager"},
     then: {
      en: "Prisoners were given a number, a striped uniform and a coloured triangle marking why they were there. Hunger, cold, beatings, disease and long days of forced labour killed many within weeks.",
      de: "Häftlinge bekamen eine Nummer, gestreifte Kleidung und einen farbigen Winkel, der den Haftgrund anzeigte. Hunger, Kälte, Schläge, Krankheiten und lange Tage der Zwangsarbeit töteten viele innerhalb weniger Wochen.",
      fr: "Les prisonniers recevaient un numéro, un uniforme rayé et un triangle de couleur indiquant le motif de leur détention. La faim, le froid, les coups, les maladies et de longues journées de travail forcé en ont tué beaucoup en quelques semaines.",
      lb: "D’Prisonéier kruten eng Nummer, gesträifte Kleeder an e faarwegen Dräieck, deen de Grond vun hirer Haft gewisen huet. Honger, Keelt, Schléi, Krankheeten a laang Deeg Zwangsaarbecht hu vill bannent e puer Wochen ëmbruecht."},
     today: {
      en: "Block 6 shows everyday life; its corridors are lined with registration photographs of prisoners, with the dates they arrived and died. Block 7 shows the living and sanitary conditions.",
      de: "Block 6 zeigt den Lageralltag; in den Gängen hängen Registrierungsfotos von Häftlingen mit dem Datum ihrer Ankunft und ihres Todes. Block 7 zeigt die Wohn- und Sanitärverhältnisse.",
      fr: "Le bloc 6 montre la vie quotidienne ; ses couloirs sont tapissés de photographies d’enregistrement de prisonniers, avec leurs dates d’arrivée et de mort. Le bloc 7 montre les conditions de logement et d’hygiène.",
      lb: "De Block 6 weist den Alldag; an de Gäng hänke Registréierungsfotoe vu Prisonéier mam Datum vun hirer Arrivée an hirem Doud. De Block 7 weist, wéi se gewunnt hunn an d’sanitär Konditiounen."},
     people: [{n: "Wilhelm Brasse",
      t: {
       en: "A Polish prisoner and trained photographer, forced to take many of these pictures: by his own estimate 40,000 to 50,000. In January 1945 he and other prisoners were ordered to burn the negatives and prints. They deliberately did it badly, and many survived.",
       de: "Ein polnischer Häftling und ausgebildeter Fotograf, der viele dieser Bilder aufnehmen musste, nach eigener Schätzung 40.000 bis 50.000. Im Januar 1945 sollten er und andere Häftlinge die Negative und Abzüge verbrennen. Sie taten es absichtlich schlecht, und viele blieben erhalten.",
       fr: "Prisonnier polonais et photographe de métier, il a été forcé de prendre une grande partie de ces photos : selon lui, 40 000 à 50 000. En janvier 1945, on lui ordonna, avec d’autres prisonniers, de brûler négatifs et tirages. Ils l’ont fait mal, exprès, et beaucoup ont été sauvés.",
       lb: "E polnesche Prisonéier a geléierte Fotograf, deen der vill vun dëse Biller huet misse maachen, no senger eegener Schätzung 40.000 bis 50.000. Am Januar 1945 sollten hien an aner Prisonéier d’Negativer an d’Ofzich verbrennen. Si hunn et extra schlecht gemaach, a vill sinn erhale bliwwen."}}],
     src: ["life"]},

    {id: "b27", at: "Blok 27", kind: "orig",
     t: {en: "Block 27: “Shoah” and the Book of Names", de: "Block 27: „Shoah“ und das Buch der Namen", fr: "Bloc 27 : « Shoah » et le Livre des noms", lb: "Block 27: „Shoah“ an d’Buch vun den Nimm"},
     then: {
      en: "Another prisoner block. Jews were the largest group deported to Auschwitz: about 1.1 million, from all over Europe.",
      de: "Ein weiterer Häftlingsblock. Juden waren die größte Gruppe der nach Auschwitz Deportierten: etwa 1,1 Millionen aus ganz Europa.",
      fr: "Un autre bloc de prisonniers. Les Juifs formaient le groupe le plus nombreux de déportés à Auschwitz : environ 1,1 million, venus de toute l’Europe.",
      lb: "Nach e Prisonéiersblock. Judde waren déi gréisste Grupp vun deenen, déi op Auschwitz deportéiert goufen: ronn 1,1 Millioun aus ganz Europa."},
     today: {
      en: "The exhibition “Shoah”, created by Yad Vashem and opened in 2013. Its centre is the Book of Names: the names of millions of Jewish victims identified so far, in alphabetical order. Many visitors look for a family name; the names of Jews deported from Luxembourg are there too. Upstairs, children’s drawings are traced onto the walls.",
      de: "Die Ausstellung „Shoah“, gestaltet von Yad Vashem und 2013 eröffnet. Im Mittelpunkt steht das Buch der Namen: die Namen von Millionen bisher identifizierter jüdischer Opfer, alphabetisch geordnet. Viele suchen einen Familiennamen; auch die Namen der aus Luxemburg deportierten Juden stehen darin. Oben sind Kinderzeichnungen auf die Wände übertragen.",
      fr: "L’exposition « Shoah », conçue par Yad Vashem et ouverte en 2013. En son centre, le Livre des noms : les noms de millions de victimes juives identifiées à ce jour, par ordre alphabétique. Beaucoup y cherchent un nom de famille ; les noms des Juifs déportés du Luxembourg y figurent aussi. À l’étage, des dessins d’enfants sont reproduits sur les murs.",
      lb: "D’Ausstellung „Shoah“, vu Yad Vashem gestalt an 2013 opgemaach. An der Mëtt steet d’Buch vun den Nimm: d’Nimm vu Millioune jiddeschen Affer, déi bis elo identifizéiert goufen, alphabetesch. Vill sichen e Familljennumm; och d’Nimm vun de Judden, déi vu Lëtzebuerg deportéiert goufen, stinn dran. Uewen si Kannerzeechnungen op d’Mauere kopéiert."},
     src: ["jews", "f50"]},

    {id: "b10", at: "Blok 10 Eksperymenty \"medyczne\"", kind: "orig",
     t: {en: "Block 10: the “experiments” block", de: "Block 10: der Block der „Experimente“", fr: "Bloc 10 : le bloc des « expériences »", lb: "Block 10: de Block vun den „Experimenter“"},
     then: {
      en: "SS doctors used Block 10 for so-called medical experiments on Jewish women prisoners. The gynaecologist Carl Clauberg searched for a fast method of mass sterilisation; Horst Schumann tested sterilisation by X-rays. Many women were left with lasting injuries or died.",
      de: "SS-Ärzte nutzten Block 10 für sogenannte medizinische Experimente an jüdischen Häftlingsfrauen. Der Gynäkologe Carl Clauberg suchte nach einer schnellen Methode der Massensterilisation, Horst Schumann erprobte die Sterilisation durch Röntgenstrahlen. Viele Frauen trugen bleibende Schäden davon oder starben.",
      fr: "Des médecins SS utilisaient le bloc 10 pour de prétendues expériences médicales sur des détenues juives. Le gynécologue Carl Clauberg cherchait une méthode rapide de stérilisation de masse ; Horst Schumann testait la stérilisation par rayons X. Beaucoup de femmes en ont gardé des séquelles ou en sont mortes.",
      lb: "SS-Dokteren hunn de Block 10 fir sougenannt medezinesch Experimenter u jiddesche Prisonéierinnen benotzt. De Gynekolog Carl Clauberg huet no enger séierer Method gesicht, fir Massen ze steriliséieren; den Horst Schumann huet d’Steriliséierung mat Röntgenstralen ausprobéiert. Vill Frae ware fir ëmmer blesséiert oder si gestuerwen."},
     today: {
      en: "Block 10 is closed to visitors. You see it from the courtyard of the Wall of Death, next door.",
      de: "Block 10 ist für Besucher geschlossen. Du siehst ihn vom Hof der Todeswand nebenan.",
      fr: "Le bloc 10 est fermé aux visiteurs. Vous le voyez depuis la cour du mur des fusillés, juste à côté.",
      lb: "De Block 10 ass fir Visiteuren zou. Du gesäis en vum Haff vun der Doudesmauer niewendrun."},
     people: [{n: "Jeanne Juda",
      t: {
       en: "The mother of Henri Juda, whom you can meet in the workshop “My family’s story”, was held in this block. She survived Auschwitz.",
       de: "Die Mutter von Henri Juda, den du im Workshop „Geschichte meiner Familie“ treffen kannst, war in diesem Block gefangen. Sie überlebte Auschwitz.",
       fr: "La mère d’Henri Juda, que vous pouvez rencontrer à l’atelier « L’histoire de ma famille », a été détenue dans ce bloc. Elle a survécu à Auschwitz.",
       lb: "D’Mamm vum Henri Juda, deen s du am Atelier „D’Geschicht vu menger Famill“ treffe kanns, war an dësem Block agespaart. Si huet Auschwitz iwwerlieft."}}],
     src: ["med"]},

    {id: "b11", at: "Blok 11 Wewnętrzne więzienie \"Blok śmierci\"", kind: "orig",
     t: {en: "Block 11: the “death block”", de: "Block 11: der „Todesblock“", fr: "Bloc 11 : le « bloc de la mort »", lb: "Block 11: den „Doudesblock“"},
     then: {
      en: "The camp prison. In the basement were dark cells, where prisoners were left to starve, and four standing cells of less than one square metre, into which four men were shut for the night before going to work the next morning. In September 1941 the SS first tested the poison gas Zyklon B in this basement, on Soviet prisoners of war and sick prisoners.",
      de: "Das Lagergefängnis. Im Keller lagen Dunkelzellen, in denen Häftlinge verhungern mussten, und vier Stehzellen von weniger als einem Quadratmeter, in die nachts je vier Männer gesperrt wurden, die am nächsten Morgen zur Arbeit mussten. Im September 1941 erprobte die SS in diesem Keller zum ersten Mal das Giftgas Zyklon B an sowjetischen Kriegsgefangenen und kranken Häftlingen.",
      fr: "La prison du camp. Au sous-sol se trouvaient des cellules obscures, où l’on laissait des prisonniers mourir de faim, et quatre cellules debout de moins d’un mètre carré, où l’on enfermait quatre hommes pour la nuit avant de les renvoyer au travail le lendemain matin. En septembre 1941, les SS ont testé pour la première fois le gaz Zyklon B dans ce sous-sol, sur des prisonniers de guerre soviétiques et des détenus malades.",
      lb: "De Prisong vum Lager. Am Keller ware Donkelzellen, wou Prisonéier verhongere missten, a véier Stoenzellen vu manner wéi engem Quadratmeter, wou nuets véier Männer agespaart goufen, déi de Moien drop schaffe musse goen. Am September 1941 huet d’SS an dësem Keller fir d’éischt de Gëftgas Zyklon B u sowjetesche Krichsgefaangenen a kranke Prisonéier getest."},
     today: {
      en: "Original. You walk through the ground floor and the basement. Photography is not allowed in the basement.",
      de: "Original. Du gehst durch das Erdgeschoss und den Keller. Im Keller ist Fotografieren verboten.",
      fr: "D’origine. Vous traversez le rez-de-chaussée et le sous-sol. Il est interdit de photographier au sous-sol.",
      lb: "Original. Du gees duerch de Rez-de-chaussée an de Keller. Am Keller däerf ee keng Fotoe maachen."},
     people: [{n: "Maksymilian Kolbe",
      t: {
       en: "A Polish Franciscan friar. In 1941, after an escape, the SS chose ten prisoners to die of starvation in this basement. Kolbe volunteered to take the place of one of them, Franciszek Gajowniczek, a father of two. Kolbe was killed here in August 1941; Gajowniczek survived the camp.",
       de: "Ein polnischer Franziskanermönch. 1941 wählte die SS nach einer Flucht zehn Häftlinge aus, die in diesem Keller verhungern sollten. Kolbe meldete sich freiwillig an Stelle eines von ihnen, Franciszek Gajowniczek, Vater von zwei Kindern. Kolbe wurde hier im August 1941 ermordet; Gajowniczek überlebte das Lager.",
       fr: "Un franciscain polonais. En 1941, après une évasion, les SS choisirent dix prisonniers condamnés à mourir de faim dans ce sous-sol. Kolbe se porta volontaire pour prendre la place de l’un d’eux, Franciszek Gajowniczek, père de deux enfants. Kolbe fut tué ici en août 1941 ; Gajowniczek a survécu au camp.",
       lb: "E polnesche Franziskanermonni. 1941 huet d’SS no enger Flucht zéng Prisonéier erausgesicht, déi an dësem Keller verhongere sollten. De Kolbe huet sech fräiwëlleg gemellt, fir d’Plaz vun engem vun hinnen ze huelen, dem Franciszek Gajowniczek, Papp vun zwee Kanner. De Kolbe gouf hei am August 1941 ëmbruecht; de Gajowniczek huet d’Lager iwwerlieft."}}],
     src: ["b11"]},

    {id: "wall", at: "Ściana Śmierci", kind: "recon",
     t: {en: "The Wall of Death", de: "Die Todeswand", fr: "Le mur des fusillés", lb: "D’Doudesmauer"},
     then: {
      en: "In the walled courtyard of Block 11, from autumn 1941 to autumn 1943, the SS shot thousands of prisoners in the back of the head, most of them Poles. The SS took the wall down in 1944.",
      de: "Im ummauerten Hof von Block 11 erschoss die SS vom Herbst 1941 bis zum Herbst 1943 Tausende Häftlinge durch Genickschuss, die meisten von ihnen Polen. 1944 ließ die SS die Wand abbauen.",
      fr: "Dans la cour fermée du bloc 11, de l’automne 1941 à l’automne 1943, les SS ont abattu d’une balle dans la nuque des milliers de prisonniers, en majorité polonais. Les SS ont démonté le mur en 1944.",
      lb: "Am zougemauerten Haff vum Block 11 huet d’SS vum Hierscht 1941 bis den Hierscht 1943 Dausende Prisonéier mat engem Schoss an d’Genéck erschoss, déi meescht vun hinnen Polen. 1944 huet d’SS d’Mauer ofgerappt."},
     today: {
      en: "The wall standing today was rebuilt after the war. Candles and flowers are laid in front of it. T2G’s commemoration on Saturday takes place here.",
      de: "Die heutige Wand wurde nach dem Krieg wieder aufgebaut. Davor werden Kerzen und Blumen niedergelegt. Hier findet am Samstag die Gedenkfeier von T2G statt.",
      fr: "Le mur actuel a été reconstruit après la guerre. On y dépose des bougies et des fleurs. C’est ici qu’a lieu la commémoration de T2G samedi.",
      lb: "D’Mauer, déi haut do steet, gouf nom Krich nees opgebaut. Virdrun ginn Käerzen a Blumme néiergeluecht. Hei ass e Samschdeg d’Gedenkfeier vun T2G."},
     src: ["shoot"]},

    {id: "rollcall", at: "Szubienica", kind: "orig",
     t: {en: "Roll-call square and the collective gallows", de: "Appellplatz und Galgen", fr: "La place d’appel et la potence collective", lb: "Appellplaz a Galgen"},
     then: {
      en: "Twice a day every prisoner had to stand here to be counted, sometimes for hours in rain or frost, until the numbers matched. Executions were carried out in front of everyone, to frighten them. On 19 July 1943 the SS hanged 12 prisoners on this gallows, in reprisal for the escape of three others from their work detail.",
      de: "Zweimal am Tag mussten alle Häftlinge hier zum Zählen antreten, manchmal stundenlang bei Regen oder Frost, bis die Zahl stimmte. Hinrichtungen fanden vor allen statt, um sie einzuschüchtern. Am 19. Juli 1943 erhängte die SS an diesem Galgen 12 Häftlinge als Vergeltung für die Flucht von drei anderen aus ihrem Arbeitskommando.",
      fr: "Deux fois par jour, tous les prisonniers devaient se tenir ici pour être comptés, parfois des heures sous la pluie ou dans le gel, jusqu’à ce que le compte soit juste. Les exécutions avaient lieu devant tous, pour les terroriser. Le 19 juillet 1943, les SS ont pendu 12 prisonniers à cette potence, en représailles à l’évasion de trois autres membres de leur kommando.",
      lb: "Zweemol den Dag huet all Prisonéier hei missen untrieden, fir gezielt ze ginn, heiansdo stonnelaang am Reen oder am Frascht, bis d’Zuel gestëmmt huet. Hirichtunge goufe virun allen duerchgefouert, fir hinnen Angscht ze maachen. De 19. Juli 1943 huet d’SS un dësem Galgen 12 Prisonéier opgehaang, als Revanche fir d’Flucht vun dräi aneren aus hirem Aarbechtskommando."},
     today: {
      en: "An open square near the camp kitchen, with the gallows at one end.",
      de: "Ein offener Platz bei der Lagerküche, mit dem Galgen an einem Ende.",
      fr: "Une place ouverte près de la cuisine du camp, avec la potence à une extrémité.",
      lb: "Eng oppe Plaz bei der Lagerkichen, mam Galgen un engem Enn."},
     src: ["hang"]},

    {id: "crem1", at: "Komora gazowa/Krematorium I", kind: "recon",
     t: {en: "Gas chamber and Crematorium I", de: "Gaskammer und Krematorium I", fr: "Chambre à gaz et crématoire I", lb: "Gaskummer a Krematorium I"},
     then: {
      en: "The first gas chamber and crematorium of Auschwitz, just outside the fence. From autumn 1941 to 1942 the SS murdered Soviet prisoners of war and Jews here, before the killing moved to Birkenau. In 1944 the building was turned into an air-raid shelter for the SS.",
      de: "Die erste Gaskammer und das erste Krematorium von Auschwitz, direkt außerhalb des Zauns. Vom Herbst 1941 bis 1942 ermordete die SS hier sowjetische Kriegsgefangene und Juden, bevor das Morden nach Birkenau verlegt wurde. 1944 wurde das Gebäude zu einem Luftschutzbunker für die SS umgebaut.",
      fr: "La première chambre à gaz et le premier crématoire d’Auschwitz, juste à l’extérieur de la clôture. De l’automne 1941 à 1942, les SS y ont assassiné des prisonniers de guerre soviétiques et des Juifs, avant que les tueries ne soient déplacées à Birkenau. En 1944, le bâtiment a été transformé en abri antiaérien pour les SS.",
      lb: "Déi éischt Gaskummer an dat éischt Krematorium vun Auschwitz, direkt baussent dem Zonk. Vum Hierscht 1941 bis 1942 huet d’SS hei sowjetesch Krichsgefaangen a Judden ermord, ier d’Ermuerden op Birkenau verluecht gouf. 1944 gouf d’Gebai zu engem Loftschutzbunker fir d’SS ëmgebaut."},
     today: {
      en: "After the war the Museum partly rebuilt it: the chimney and two furnaces were put back using original parts. A few metres away stands the gallows where Rudolf Höss, the first commandant of Auschwitz, was hanged on 16 April 1947 after a Polish court sentenced him to death.",
      de: "Nach dem Krieg baute das Museum es teilweise wieder auf: Der Schornstein und zwei Öfen wurden aus Originalteilen rekonstruiert. Wenige Meter entfernt steht der Galgen, an dem Rudolf Höss, der erste Kommandant von Auschwitz, am 16. April 1947 hingerichtet wurde, nachdem ein polnisches Gericht ihn zum Tod verurteilt hatte.",
      fr: "Après la guerre, le musée l’a en partie reconstruit : la cheminée et deux fours ont été remis en place avec des pièces d’origine. À quelques mètres se dresse la potence où Rudolf Höss, le premier commandant d’Auschwitz, a été pendu le 16 avril 1947, après sa condamnation à mort par un tribunal polonais.",
      lb: "Nom Krich huet de Musée et deelweis nees opgebaut: De Schornsteen an zwee Uewe goufen aus Originaldeeler rekonstruéiert. E puer Meter ewech steet de Galgen, un deem de Rudolf Höss, den éischte Kommandant vun Auschwitz, de 16. Abrëll 1947 higeriicht gouf, nodeems e polnescht Geriicht hien zum Doud veruerteelt hat."},
     src: ["a1", "shoah"]}
  ],

  bk: [
    {id: "gate", at: "Główna wieża wartownicza / Brama obozu zagłady", kind: "orig",
     t: {en: "The main gate", de: "Das Haupttor", fr: "Le portail principal", lb: "D’Haaptpaart"},
     then: {
      en: "The main guard building of Birkenau. In spring 1944 the SS extended the railway through this gate into the camp, so that trains could be unloaded a few hundred metres from the gas chambers. It was first used in May 1944, for the deportation of Jews from Hungary: about 430,000 people in less than two months, most of them murdered on arrival.",
      de: "Das Hauptwachgebäude von Birkenau. Im Frühjahr 1944 verlängerte die SS die Bahnlinie durch dieses Tor ins Lager, damit die Züge wenige hundert Meter vor den Gaskammern entladen werden konnten. Zum ersten Mal genutzt wurde sie im Mai 1944, für die Deportation der Juden aus Ungarn: etwa 430.000 Menschen in weniger als zwei Monaten, die meisten bei der Ankunft ermordet.",
      fr: "Le bâtiment principal de garde de Birkenau. Au printemps 1944, les SS ont prolongé la voie ferrée à travers ce portail jusque dans le camp, pour que les trains soient déchargés à quelques centaines de mètres des chambres à gaz. Elle a servi pour la première fois en mai 1944, pour la déportation des Juifs de Hongrie : environ 430 000 personnes en moins de deux mois, la plupart assassinées dès leur arrivée.",
      lb: "D’Haaptwuechtgebai vu Birkenau. Am Fréijoer 1944 huet d’SS d’Eisebunn duerch dës Paart bis an d’Lager verlängert, fir datt d’Zich e puer honnert Meter virun de Gaskummeren ausgeluede kënne ginn. Fir d’éischt benotzt gouf se am Mee 1944, fir d’Deportatioun vun de Judden aus Ungarn: ongeféier 430.000 Mënschen a manner wéi zwee Méint, déi meescht bei hirer Arrivée ermord."},
     today: {
      en: "Original. When the tower is open, its window gives a view along the rails and over the whole camp.",
      de: "Original. Wenn der Turm offen ist, sieht man aus seinem Fenster die Gleise entlang und über das ganze Lager.",
      fr: "D’origine. Quand la tour est ouverte, sa fenêtre offre une vue le long des rails et sur tout le camp.",
      lb: "Original. Wann den Tuerm op ass, gesäit een duerch seng Fënster laanscht d’Schinnen an iwwer dat ganzt Lager."},
     src: ["a2", "shoah"]},

    {id: "ramp", at: "Wagon kolejowy", kind: "orig",
     t: {en: "The ramp and the selection", de: "Die Rampe und die Selektion", fr: "La rampe et la sélection", lb: "D’Rampe an d’Selektioun"},
     then: {
      en: "Here the trains were unloaded and SS doctors carried out the “selection”: a glance, a gesture, left or right. Those judged fit for work, usually a minority, were registered as prisoners. The others, children, their mothers, the elderly and the sick, were sent straight to the gas chambers. Before May 1944 the trains stopped at the “Judenrampe”, between the two camps.",
      de: "Hier wurden die Züge entladen und SS-Ärzte führten die „Selektion“ durch: ein Blick, eine Handbewegung, links oder rechts. Wer als arbeitsfähig galt, meist eine Minderheit, wurde als Häftling registriert. Die anderen, Kinder, ihre Mütter, Alte und Kranke, wurden sofort in die Gaskammern geschickt. Vor Mai 1944 hielten die Züge an der „Judenrampe“ zwischen den beiden Lagern.",
      fr: "Ici, les trains étaient déchargés et des médecins SS procédaient à la « sélection » : un regard, un geste, à gauche ou à droite. Ceux qu’on jugeait aptes au travail, en général une minorité, étaient enregistrés comme prisonniers. Les autres, les enfants, leurs mères, les personnes âgées et les malades, étaient envoyés directement aux chambres à gaz. Avant mai 1944, les trains s’arrêtaient à la « Judenrampe », entre les deux camps.",
      lb: "Hei goufen d’Zich ausgelueden an SS-Dokteren hunn d’„Selektioun“ gemaach: e Bléck, eng Handbeweegung, lénks oder riets. Wien als aarbechtsfäeg gegollt huet, meeschtens eng Minoritéit, gouf als Prisonéier registréiert. Déi aner, Kanner, hir Mammen, al a krank Leit, goufen direkt an d’Gaskummere geschéckt. Virum Mee 1944 hunn d’Zich op der „Judenrampe“ tëscht deenen zwee Lageren ugehalen."},
     today: {
      en: "The tracks are original. The single freight wagon standing on them is a memorial to the trains that brought people here.",
      de: "Die Gleise sind original. Der einzelne Güterwaggon darauf erinnert an die Züge, die die Menschen hierher brachten.",
      fr: "Les rails sont d’origine. L’unique wagon de marchandises qui s’y trouve rappelle les trains qui ont amené les gens ici.",
      lb: "D’Schinne sinn original. Deen eenzege Gidderwon dorop erënnert un d’Zich, déi d’Mënschen heihi bruecht hunn."},
     people: [{n: "Lili Jacob",
      t: {
       en: "In May 1944 two SS men photographed the arrival of a transport of Jews from Hungary on this ramp. Lili Jacob, a young woman from that transport, survived. After liberation, in another camp, she found the album and recognised herself, her rabbi and her little brothers in it. The “Auschwitz Album” is the only photographic record of an arrival; she gave it to Yad Vashem in 1980.",
       de: "Im Mai 1944 fotografierten zwei SS-Männer auf dieser Rampe die Ankunft eines Transports von Juden aus Ungarn. Lili Jacob, eine junge Frau aus diesem Transport, überlebte. Nach der Befreiung fand sie in einem anderen Lager das Album und erkannte darin sich selbst, ihren Rabbiner und ihre kleinen Brüder. Das „Auschwitz-Album“ ist die einzige fotografische Dokumentation einer Ankunft; sie übergab es 1980 Yad Vashem.",
       fr: "En mai 1944, deux SS ont photographié sur cette rampe l’arrivée d’un convoi de Juifs de Hongrie. Lili Jacob, une jeune femme de ce convoi, a survécu. Après la libération, dans un autre camp, elle a trouvé l’album et s’y est reconnue, avec son rabbin et ses petits frères. L’« Album d’Auschwitz » est le seul témoignage photographique d’une arrivée ; elle l’a donné à Yad Vashem en 1980.",
       lb: "Am Mee 1944 hunn zwee SS-Männer op dëser Rampe d’Arrivée vun engem Transport vu Judden aus Ungarn fotograféiert. D’Lili Jacob, eng jonk Fra aus deem Transport, huet iwwerlieft. No der Befreiung huet si an engem anere Lager den Album fonnt an dran sech selwer, hire Rabbiner an hir kleng Bridder erkannt. Den „Auschwitz-Album“ ass déi eenzeg fotografesch Dokumentatioun vun enger Arrivée; si huet en 1980 dem Yad Vashem ginn."}}],
     src: ["shoah"]},

    {id: "bIIb", at: "Odcinek BIIb rodzinny dla Żydów z Teresina", kind: "area",
     t: {en: "BIIb: the family camp for Jews from Theresienstadt", de: "BIIb: das Familienlager für Juden aus Theresienstadt", fr: "BIIb : le camp des familles juives de Theresienstadt", lb: "BIIb: d’Familljelager fir Judden aus Theresienstadt"},
     then: {
      en: "From September 1943, Jews deported from the Theresienstadt ghetto were held here as families, without selection, in their own clothes, apparently so that the camp could be shown if the Red Cross asked. In March 1944 the SS murdered the people of the first transports in the gas chambers; the rest of the family camp was liquidated in July 1944.",
      de: "Ab September 1943 wurden aus dem Ghetto Theresienstadt deportierte Juden hier als Familien festgehalten, ohne Selektion und in eigener Kleidung, offenbar um das Lager vorzeigen zu können, falls das Rote Kreuz nachfragte. Im März 1944 ermordete die SS die Menschen der ersten Transporte in den Gaskammern; der Rest des Familienlagers wurde im Juli 1944 aufgelöst.",
      fr: "À partir de septembre 1943, des Juifs déportés du ghetto de Theresienstadt ont été détenus ici en familles, sans sélection et dans leurs propres vêtements, apparemment pour pouvoir montrer le camp si la Croix-Rouge le demandait. En mars 1944, les SS ont assassiné dans les chambres à gaz les personnes des premiers convois ; le reste du camp des familles a été liquidé en juillet 1944.",
      lb: "Ab September 1943 goufen hei Judden, déi aus dem Ghetto Theresienstadt deportéiert gi waren, als Famillen agespaart, ouni Selektioun an an hiren eegene Kleeder, anscheinend fir d’Lager weisen ze kënnen, wann d’Rout Kräiz géif froen. Am Mäerz 1944 huet d’SS d’Mënschen aus den éischten Transporter an de Gaskummeren ermord; de Rescht vum Familljelager gouf am Juli 1944 opgeléist."},
     today: {
      en: "Only the chimneys and foundations of the barracks remain.",
      de: "Von den Baracken sind nur Schornsteine und Fundamente geblieben.",
      fr: "Il ne reste des baraquements que les cheminées et les fondations.",
      lb: "Vun de Baracke sinn nëmmen d’Schornsteng an d’Fundamenter bliwwen."},
     people: [{n: "Fredy Hirsch",
      t: {
       en: "A young Jewish sports teacher from Germany who set up a children’s block in the family camp: lessons, games, songs and theatre, a few hours in which children could be children. He died in March 1944, the night the first transports were murdered.",
       de: "Ein junger jüdischer Sportlehrer aus Deutschland, der im Familienlager einen Kinderblock einrichtete: Unterricht, Spiele, Lieder und Theater, ein paar Stunden, in denen Kinder Kinder sein konnten. Er starb im März 1944, in der Nacht, in der die ersten Transporte ermordet wurden.",
       fr: "Un jeune professeur de sport juif venu d’Allemagne, qui a créé un bloc pour enfants dans le camp des familles : leçons, jeux, chansons et théâtre, quelques heures où les enfants pouvaient être des enfants. Il est mort en mars 1944, la nuit où les premiers convois ont été assassinés.",
       lb: "E jonke jiddesche Sportsproff aus Däitschland, deen am Familljelager e Kannerblock ageriicht huet: Unterrecht, Spiller, Lidder an Theater, e puer Stonnen, an deene Kanner Kanner kéinte sinn. Hien ass am Mäerz 1944 gestuerwen, an der Nuecht, an där déi éischt Transporter ermord goufen."}}],
     src: ["kids"]},

    {id: "bIIe", at: "Odcinek BIIe dla rodzin Cyganów", kind: "area",
     t: {en: "BIIe: the camp for Sinti and Roma families", de: "BIIe: das Lager für Familien der Sinti und Roma", fr: "BIIe : le camp des familles sintés et roms", lb: "BIIe: d’Lager fir Famille vu Sinti a Roma"},
     then: {
      en: "From February 1943 about 23,000 Sinti and Roma, from Germany, Austria, Czechia and other countries, were deported to Auschwitz and held here as families. About 21,000 of them died of hunger and disease or were murdered. The SS doctor Josef Mengele used children, especially twins, for experiments. On the evening of 2 August 1944 the SS sent the 4,200 to 4,300 people still in this camp to the gas chambers.",
      de: "Ab Februar 1943 wurden etwa 23.000 Sinti und Roma aus Deutschland, Österreich, Tschechien und anderen Ländern nach Auschwitz deportiert und hier als Familien festgehalten. Etwa 21.000 von ihnen starben an Hunger und Krankheiten oder wurden ermordet. Der SS-Arzt Josef Mengele missbrauchte Kinder, vor allem Zwillinge, für Experimente. Am Abend des 2. August 1944 schickte die SS die 4.200 bis 4.300 Menschen, die noch in diesem Lager waren, in die Gaskammern.",
      fr: "À partir de février 1943, environ 23 000 Sintés et Roms, venus d’Allemagne, d’Autriche, de Tchéquie et d’autres pays, ont été déportés à Auschwitz et détenus ici en familles. Environ 21 000 d’entre eux sont morts de faim et de maladie ou ont été assassinés. Le médecin SS Josef Mengele utilisait des enfants, surtout des jumeaux, pour ses expériences. Le soir du 2 août 1944, les SS ont envoyé aux chambres à gaz les 4 200 à 4 300 personnes encore présentes dans ce camp.",
      lb: "Ab Februar 1943 goufen ongeféier 23.000 Sinti a Roma aus Däitschland, Éisterräich, Tschechien an anere Länner op Auschwitz deportéiert an hei als Famillen agespaart. Ongeféier 21.000 vun hinne si vun Honger a Krankheeten gestuerwen oder goufen ermord. Den SS-Dokter Josef Mengele huet Kanner, virun allem Zwillingen, fir Experimenter mëssbraucht. Den Owend vum 2. August 1944 huet d’SS déi 4.200 bis 4.300 Mënschen, déi nach an dësem Lager waren, an d’Gaskummere geschéckt."},
     today: {
      en: "Foundations and chimneys. 2 August is now the European Holocaust Memorial Day for Sinti and Roma.",
      de: "Fundamente und Schornsteine. Der 2. August ist heute der Europäische Holocaust-Gedenktag für Sinti und Roma.",
      fr: "Des fondations et des cheminées. Le 2 août est aujourd’hui la Journée européenne de commémoration du génocide des Sintés et des Roms.",
      lb: "Fundamenter a Schornsteng. Den 2. August ass haut den europäeschen Holocaust-Gedenkdag fir Sinti a Roma."},
     src: ["roma"]},

    {id: "crem23", at: "Komora gazowa/Krematorium II", kind: "ruin", alsoAt: "Komora gazowa/Krematorium III",
     t: {en: "Gas chambers and Crematoria II and III", de: "Gaskammern und Krematorien II und III", fr: "Chambres à gaz et crématoires II et III", lb: "Gaskummeren a Krematorien II an III"},
     then: {
      en: "The two largest killing installations of the camp, in operation from spring 1943. Each had an underground undressing room and gas chamber. People were told they were going to shower. SS men poured Zyklon B in through openings in the roof. Prisoners of the Sonderkommando were forced to remove the bodies and burn them in the furnaces.",
      de: "Die beiden größten Tötungsanlagen des Lagers, in Betrieb seit dem Frühjahr 1943. Jede hatte einen unterirdischen Auskleideraum und eine Gaskammer. Den Menschen sagte man, sie würden duschen. SS-Männer schütteten Zyklon B durch Öffnungen im Dach. Häftlinge des Sonderkommandos mussten die Leichen herausholen und in den Öfen verbrennen.",
      fr: "Les deux plus grandes installations de mise à mort du camp, en service à partir du printemps 1943. Chacune comprenait un vestiaire et une chambre à gaz souterrains. On disait aux gens qu’ils allaient se doucher. Des SS versaient le Zyklon B par des ouvertures dans le toit. Des prisonniers du Sonderkommando étaient forcés de sortir les corps et de les brûler dans les fours.",
      lb: "Déi zwou gréisst Ëmbrénganlage vum Lager, a Betrib zënter dem Fréijoer 1943. All eng hat en ënnerierdeschen Ausdoraum an eng Gaskummer. De Mënschen huet een erzielt, si géifen duschen. SS-Männer hunn Zyklon B duerch Ëffnungen am Daach geschott. Prisonéier vum Sonderkommando hu missen d’Läiche rausdroen an an den Iewe verbrennen."},
     today: {
      en: "In January 1945, before leaving, the SS blew up both buildings to hide what they had done. The ruins have been left as they were. Signs show plans and photographs.",
      de: "Im Januar 1945 sprengte die SS vor ihrem Abzug beide Gebäude, um ihre Taten zu verbergen. Die Ruinen wurden so gelassen, wie sie waren. Tafeln zeigen Pläne und Fotos.",
      fr: "En janvier 1945, avant de partir, les SS ont dynamité les deux bâtiments pour cacher ce qu’ils avaient fait. Les ruines ont été laissées telles quelles. Des panneaux montrent des plans et des photos.",
      lb: "Am Januar 1945 huet d’SS virum Fortgoen déi zwee Gebaier gesprengt, fir ze verstoppen, wat se gemaach haten. D’Ruine goufe gelooss, wéi se waren. Tafele weisen Pläng a Fotoen."},
     src: ["shoah"]},

    {id: "monument", at: "Międzynarodowy Pomnik Ofiar Obozu Auschwitz", kind: "mem",
     t: {en: "The International Monument", de: "Das Internationale Mahnmal", fr: "Le Monument international", lb: "Dat internationaalt Mahnmal"},
     then: {
      en: "The end of the railway line, between Crematoria II and III: where the journey ended for most of the people deported here.",
      de: "Das Ende der Bahnlinie, zwischen den Krematorien II und III: Hier endete der Weg für die meisten, die hierher deportiert wurden.",
      fr: "Le bout de la voie ferrée, entre les crématoires II et III : c’est ici que le voyage s’arrêtait pour la plupart des déportés.",
      lb: "D’Enn vun der Eisebunnslinn, tëscht de Krematorien II an III: Hei huet de Wee fir déi meescht opgehalen, déi heihi deportéiert goufen."},
     today: {
      en: "Unveiled in 1967. Plaques in front of it carry the same text in the languages of the victims; a plaque in Luxembourgish was added in January 2015. The text asks that this place be forever “a cry of despair and a warning to humanity”. T2G’s commemoration on Sunday takes place here.",
      de: "1967 eingeweiht. Tafeln davor tragen denselben Text in den Sprachen der Opfer; eine Tafel auf Luxemburgisch kam im Januar 2015 hinzu. Der Text verlangt, dass dieser Ort für immer „ein Aufschrei der Verzweiflung und eine Mahnung an die Menschheit“ sei. Hier findet am Sonntag die Gedenkfeier von T2G statt.",
      fr: "Inauguré en 1967. Devant lui, des plaques portent le même texte dans les langues des victimes ; une plaque en luxembourgeois a été ajoutée en janvier 2015. Le texte demande que ce lieu soit à jamais « un cri de désespoir et un avertissement à l’humanité ». C’est ici qu’a lieu la commémoration de T2G dimanche.",
      lb: "1967 ageweit. Tafele virdrun droen deeselwechten Text an de Sprooche vun den Affer; eng Tafel op Lëtzebuergesch koum am Januar 2015 derbäi. Den Text freet, datt dës Plaz fir ëmmer „e Schrei vun der Verzweiflung an eng Warnung fir d’Mënschheet“ soll sinn. Hei ass e Sonndeg d’Gedenkfeier vun T2G."},
     src: ["a2"]},

    {id: "crem4", at: "Komora gazowa/Krematorium IV", kind: "ruin",
     t: {en: "Crematorium IV and the Sonderkommando revolt", de: "Krematorium IV und der Aufstand des Sonderkommandos", fr: "Le crématoire IV et la révolte du Sonderkommando", lb: "Krematorium IV an den Opstand vum Sonderkommando"},
     then: {
      en: "Crematoria IV and V were built above ground at the edge of the birch wood that gave Birkenau its name. On 7 October 1944 the Sonderkommando prisoners rose up and set Crematorium IV on fire; it was never used again. Hundreds of them were killed. The explosives came from young Jewish women forced to work in a munitions factory, who smuggled gunpowder out.",
      de: "Die Krematorien IV und V wurden oberirdisch am Rand des Birkenwaldes gebaut, der Birkenau seinen Namen gab. Am 7. Oktober 1944 erhoben sich die Häftlinge des Sonderkommandos und steckten Krematorium IV in Brand; es wurde nie wieder benutzt. Hunderte von ihnen wurden getötet. Der Sprengstoff stammte von jungen jüdischen Frauen, die in einer Munitionsfabrik Zwangsarbeit leisteten und Schießpulver herausschmuggelten.",
      fr: "Les crématoires IV et V ont été construits en surface, en bordure du bois de bouleaux qui a donné son nom à Birkenau. Le 7 octobre 1944, les prisonniers du Sonderkommando se sont révoltés et ont incendié le crématoire IV ; il n’a plus jamais servi. Des centaines d’entre eux ont été tués. Les explosifs venaient de jeunes femmes juives forcées de travailler dans une usine de munitions, qui avaient fait sortir de la poudre en cachette.",
      lb: "D’Krematorien IV a V goufen iwwerierdesch um Rand vum Bierkebësch gebaut, deen Birkenau säin Numm ginn huet. De 7. Oktober 1944 hunn d’Prisonéier vum Sonderkommando sech opgeléint an de Krematorium IV a Brand gestach; e gouf ni méi benotzt. Honnerte vun hinne goufen ëmbruecht. De Sprengstoff koum vu jonke jiddesche Fraen, déi an enger Munitiounsfabrik Zwangsaarbecht gemaach an Polver erausgeschmuggelt hunn."},
     today: {
      en: "Only the foundations remain, among the trees.",
      de: "Nur die Fundamente sind geblieben, zwischen den Bäumen.",
      fr: "Il ne reste que les fondations, parmi les arbres.",
      lb: "Nëmmen d’Fundamenter si bliwwen, tëscht de Beem."},
     people: [{n: "Ala Gertner, Róża Robota, Regina Safirsztajn, Estusia Wajcblum",
      t: {
       en: "The four young women accused of supplying the gunpowder. They were tortured and did not give away the others. The SS hanged them in front of the women prisoners on 6 January 1945, three weeks before the liberation.",
       de: "Die vier jungen Frauen, die beschuldigt wurden, das Schießpulver geliefert zu haben. Sie wurden gefoltert und verrieten die anderen nicht. Die SS erhängte sie am 6. Januar 1945 vor den Augen der weiblichen Häftlinge, drei Wochen vor der Befreiung.",
       fr: "Les quatre jeunes femmes accusées d’avoir fourni la poudre. Torturées, elles n’ont pas dénoncé les autres. Les SS les ont pendues devant les détenues le 6 janvier 1945, trois semaines avant la libération.",
       lb: "Déi véier jonk Fraen, déi beschëllegt goufen, de Polver geliwwert ze hunn. Si goufe gefoltert an hunn déi aner net verroden. D’SS huet se de 6. Januar 1945 virun den Ae vun de Prisonéierinnen opgehaang, dräi Woche virun der Befreiung."}}],
     src: ["res", "hang"]},

    {id: "crem5", at: "Komora gazowa/Krematorium V", kind: "ruin",
     t: {en: "Crematorium V, the pits and the hidden photographs", de: "Krematorium V, die Gruben und die versteckten Fotos", fr: "Le crématoire V, les fosses et les photos cachées", lb: "Krematorium V, d’Gruewen an déi verstoppte Fotoen"},
     then: {
      en: "In summer 1944, when the crematoria could not keep up with the transports from Hungary, the SS also burned bodies in open pits beside Crematorium V. In August 1944 members of the Sonderkommando secretly photographed this from inside the building. The film was smuggled out of the camp to the Polish resistance in a tube of toothpaste. These four pictures are the only photographs of the killing taken by prisoners.",
      de: "Im Sommer 1944, als die Krematorien mit den Transporten aus Ungarn nicht nachkamen, verbrannte die SS Leichen auch in offenen Gruben neben Krematorium V. Im August 1944 fotografierten Mitglieder des Sonderkommandos dies heimlich aus dem Gebäude heraus. Der Film wurde in einer Zahnpastatube aus dem Lager zum polnischen Widerstand geschmuggelt. Diese vier Bilder sind die einzigen Fotos des Mordens, die Häftlinge aufgenommen haben.",
      fr: "À l’été 1944, quand les crématoires ne suffisaient plus face aux convois de Hongrie, les SS ont aussi brûlé des corps dans des fosses à ciel ouvert à côté du crématoire V. En août 1944, des membres du Sonderkommando l’ont photographié en cachette depuis l’intérieur du bâtiment. Le film est sorti du camp dans un tube de dentifrice pour rejoindre la résistance polonaise. Ces quatre images sont les seules photos de la mise à mort prises par des prisonniers.",
      lb: "Am Summer 1944, wéi d’Krematorien d’Transporter aus Ungarn net méi bewältegt hunn, huet d’SS Läichen och an oppene Gruewen nieft dem Krematorium V verbrannt. Am August 1944 hu Membere vum Sonderkommando dat heemlech aus dem Gebai eraus fotograféiert. De Film gouf an enger Zännpastatub aus dem Lager bei de polnesche Widderstand geschmuggelt. Dës véier Biller sinn déi eenzeg Fotoe vum Ermuerden, déi Prisonéier gemaach hunn."},
     today: {
      en: "Foundations among the trees. Nearby is one of the ponds where the SS dumped human ashes.",
      de: "Fundamente zwischen den Bäumen. In der Nähe liegt einer der Teiche, in die die SS menschliche Asche schüttete.",
      fr: "Des fondations parmi les arbres. Tout près se trouve l’un des étangs où les SS déversaient des cendres humaines.",
      lb: "Fundamenter tëscht de Beem. No dobäi läit ee vun de Weieren, an déi d’SS mënschlech Äsch geschott huet."},
     src: ["res"]},

    {id: "kanada", at: "Magazyny rzeczy zagrabionych pomordowanym \"Kanada II\"", kind: "ruin",
     t: {en: "“Kanada”: the warehouses of stolen belongings", de: "„Kanada“: die Lager der geraubten Habe", fr: "« Kanada » : les entrepôts des biens volés", lb: "„Kanada“: d’Lagere vun de geklauten Saachen"},
     then: {
      en: "About thirty barracks where prisoners had to sort everything taken from the deportees: clothes, shoes, glasses, money, jewellery, food. Prisoners called it “Kanada”, after a country imagined as rich. The goods were sent to Germany.",
      de: "Etwa dreißig Baracken, in denen Häftlinge alles sortieren mussten, was den Deportierten abgenommen wurde: Kleidung, Schuhe, Brillen, Geld, Schmuck, Lebensmittel. Die Häftlinge nannten es „Kanada“, nach einem Land, das sie sich reich vorstellten. Die Waren wurden nach Deutschland geschickt.",
      fr: "Une trentaine de baraquements où des prisonniers devaient trier tout ce qu’on avait pris aux déportés : vêtements, chaussures, lunettes, argent, bijoux, nourriture. Les prisonniers l’appelaient « Kanada », d’après un pays qu’ils imaginaient riche. Les biens étaient envoyés en Allemagne.",
      lb: "Ongeféier drësseg Baracken, an deene Prisonéier alles missten sortéieren, wat de Deportéierten ofgeholl gouf: Kleeder, Schong, Brëller, Suen, Bijouen, Iessen. D’Prisonéier hunn et „Kanada“ genannt, no engem Land, dat se sech räich virgestallt hunn. D’Wuere goufen an Däitschland geschéckt."},
     today: {
      en: "The SS set the warehouses on fire before fleeing in January 1945. Only the foundations remain.",
      de: "Die SS zündete die Lager vor ihrer Flucht im Januar 1945 an. Nur die Fundamente sind geblieben.",
      fr: "Les SS ont incendié les entrepôts avant de fuir en janvier 1945. Il n’en reste que les fondations.",
      lb: "D’SS huet d’Lageren a Brand gestach, ier se am Januar 1945 geflücht ass. Nëmmen d’Fundamenter si bliwwen."},
     src: ["shoah"]},

    {id: "sauna", at: "Główna łaźnia \"Sauna\"", kind: "orig",
     t: {en: "The “Sauna”", de: "Die „Sauna“", fr: "Le « Sauna »", lb: "D’„Sauna“"},
     then: {
      en: "The central bath house. People selected for work were brought here: they had to undress, were shaved, showered and disinfected, given striped clothes and registered with a number. Their own clothes were deloused in steam chambers.",
      de: "Das zentrale Badehaus. Wer zur Arbeit selektiert wurde, kam hierher: ausziehen, scheren, duschen, desinfizieren, gestreifte Kleidung, Registrierung mit einer Nummer. Die eigene Kleidung wurde in Dampfkammern entlaust.",
      fr: "Le bâtiment central des bains. Les personnes sélectionnées pour le travail étaient amenées ici : elles devaient se déshabiller, étaient rasées, douchées, désinfectées, recevaient des vêtements rayés et étaient enregistrées sous un numéro. Leurs propres vêtements étaient épouillés dans des chambres à vapeur.",
      lb: "Dat zentraalt Buedhaus. Wien zur Aarbecht selektéiert gouf, koum heihin: sech ausdoen, geschier ginn, duschen, desinfizéiert ginn, gesträifte Kleeder kréien an ënner enger Nummer registréiert ginn. Déi eege Kleeder goufen an Dampkummeren entlaust."},
     today: {
      en: "The original building, with an exhibition. At the end are more than 2,000 family photographs that deportees had brought with them: weddings, holidays, children, ordinary life.",
      de: "Das Originalgebäude mit einer Ausstellung. Am Ende hängen mehr als 2.000 Familienfotos, die Deportierte mitgebracht hatten: Hochzeiten, Ferien, Kinder, ganz normales Leben.",
      fr: "Le bâtiment d’origine, avec une exposition. À la fin, plus de 2 000 photos de famille que des déportés avaient emportées : mariages, vacances, enfants, la vie ordinaire.",
      lb: "D’Originalgebai mat enger Ausstellung. Um Enn hänke méi wéi 2.000 Familljefotoen, déi Deportéiert matbruecht haten: Hochzäiten, Vakanz, Kanner, dat ganz normaalt Liewen."},
     src: ["a2"]},

    {id: "bIIa", at: "Odcinek BIIa kwarantanna mężczyzn", kind: "area",
     t: {en: "The wooden barracks and the field of chimneys", de: "Die Holzbaracken und das Feld der Schornsteine", fr: "Les baraques en bois et le champ de cheminées", lb: "D’Holzbaracken an d’Feld vun de Schornsteng"},
     then: {
      en: "Most barracks in sector BII were prefabricated army horse stables, designed for 52 horses. Each held 400 or more prisoners on three-level bunks, with no insulation and a single brick stove. Some barracks were latrines and washrooms, which prisoners could use only at set times, in a hurry.",
      de: "Die meisten Baracken im Abschnitt BII waren vorgefertigte Pferdeställe der Armee, gebaut für 52 Pferde. In jeder lebten 400 oder mehr Häftlinge auf dreistöckigen Pritschen, ohne Isolierung und mit einem einzigen gemauerten Ofen. Einige Baracken waren Latrinen und Waschräume, die Häftlinge nur zu festen Zeiten und in aller Eile benutzen durften.",
      fr: "La plupart des baraquements du secteur BII étaient des écuries préfabriquées de l’armée, prévues pour 52 chevaux. Chacun abritait 400 prisonniers ou plus sur des châlits à trois niveaux, sans isolation et avec un seul poêle en briques. Certains servaient de latrines et de lavabos, que les prisonniers ne pouvaient utiliser qu’à heures fixes, en hâte.",
      lb: "Déi meescht Baracken am Sektor BII ware virfabrizéiert Päerdsställ vun der Arméi, fir 52 Päerd geduecht. An all eenzelner hu 400 oder méi Prisonéier op dräistäckege Pritschen gelieft, ouni Isolatioun a mat engem eenzege gemauerten Uewen. Verschidde Baracke ware Latrinnen a Wäschraim, déi d’Prisonéier nëmmen zu feste Zäiten an an aller Séier benotze konnten."},
     today: {
      en: "A few wooden barracks near the gate still stand or were rebuilt. Across the rest of the camp only the brick chimneys and stove flues remain, row after row. Switch on “1944 volumes” above to see how dense the camp once was.",
      de: "Einige Holzbaracken beim Tor stehen noch oder wurden wieder aufgebaut. Im Rest des Lagers sind nur die gemauerten Schornsteine und Heizkanäle geblieben, Reihe um Reihe. Schalte oben „Volumen 1944“ ein, um zu sehen, wie dicht das Lager einmal bebaut war.",
      fr: "Quelques baraques en bois près du portail sont encore debout ou ont été reconstruites. Dans le reste du camp, il ne reste que les cheminées et les conduits de poêle en briques, rangée après rangée. Activez « Volumes de 1944 » ci-dessus pour voir à quel point le camp était dense.",
      lb: "E puer Holzbaracke bei der Paart stinn nach oder goufen nees opgebaut. Am Rescht vum Lager sinn nëmmen déi gemauert Schornsteng an Heizkanäl bliwwen, Rei fir Rei. Maach uewen „Volumen 1944“ un, fir ze gesinn, wéi dicht d’Lager eemol bebaut war."},
     src: ["life"]},

    {id: "women", at: "Odcinek BIa obóz kobiecy", kind: "area",
     t: {en: "BI: the women’s camp", de: "BI: das Frauenlager", fr: "BI : le camp des femmes", lb: "BI: d’Frae­lager"},
     then: {
      en: "Sector BI, with brick and wooden barracks, was the first part of Birkenau to be built. From August 1942 it became the women’s camp. Block 25 was the “death block”: women selected for death were locked in, often for days without food, before being taken to the gas chambers.",
      de: "Der Abschnitt BI mit Backstein- und Holzbaracken war der erste gebaute Teil von Birkenau. Ab August 1942 wurde er zum Frauenlager. Block 25 war der „Todesblock“: Frauen, die zum Tod selektiert waren, wurden hier eingesperrt, oft tagelang ohne Essen, bevor man sie in die Gaskammern brachte.",
      fr: "Le secteur BI, avec ses baraques en briques et en bois, a été la première partie construite de Birkenau. À partir d’août 1942, il devint le camp des femmes. Le bloc 25 était le « bloc de la mort » : les femmes sélectionnées pour mourir y étaient enfermées, souvent des jours sans nourriture, avant d’être conduites aux chambres à gaz.",
      lb: "De Sektor BI mat Bréck- an Holzbaracke war deen éischten Deel vu Birkenau, dee gebaut gouf. Ab August 1942 gouf en d’Fraelager. De Block 25 war den „Doudesblock“: Fraen, déi fir den Doud selektéiert waren, goufen hei agespaart, dacks deelaang ouni Iessen, ier se an d’Gaskummere bruecht goufen."},
     today: {
      en: "The brick barracks still stand. Inside some of them you can see the bunks.",
      de: "Die Backsteinbaracken stehen noch. In einigen sieht man die Pritschen.",
      fr: "Les baraques en briques sont toujours debout. Dans certaines, on voit les châlits.",
      lb: "D’Bréckbaracke stinn nach. An e puer gesäit een d’Pritschen."},
     people: [
      {n: "Simone Veil",
       t: {
        en: "Simone Jacob was 16 when she arrived in April 1944 from Drancy, near Paris, with her mother and her sister. All three were later moved to other camps; her mother died in Bergen-Belsen. As Simone Veil she became, in 1979, the first President of the directly elected European Parliament.",
        de: "Simone Jacob war 16, als sie im April 1944 mit ihrer Mutter und ihrer Schwester aus Drancy bei Paris ankam. Alle drei wurden später in andere Lager gebracht; ihre Mutter starb in Bergen-Belsen. Als Simone Veil wurde sie 1979 die erste Präsidentin des direkt gewählten Europäischen Parlaments.",
        fr: "Simone Jacob avait 16 ans quand elle est arrivée en avril 1944 de Drancy, près de Paris, avec sa mère et sa sœur. Toutes trois furent ensuite transférées dans d’autres camps ; sa mère est morte à Bergen-Belsen. Devenue Simone Veil, elle fut en 1979 la première présidente du Parlement européen élu au suffrage direct.",
        lb: "D’Simone Jacob war 16, wéi si am Abrëll 1944 mat hirer Mamm an hirer Schwëster aus Drancy bei Paräis ukomm ass. All dräi goufe spéider an aner Lagere bruecht; hir Mamm ass zu Bergen-Belsen gestuerwen. Als Simone Veil gouf si 1979 déi éischt Presidentin vum direkt gewielten Europäesche Parlament."}},
      {n: "Anne Frank",
       t: {
        en: "Anne Frank arrived from the Netherlands with her family in September 1944 and was held in the women’s camp with her sister Margot and her mother Edith. At the end of October the sisters were moved to Bergen-Belsen, where both died in early 1945. Edith died here in Birkenau in January 1945.",
        de: "Anne Frank kam im September 1944 mit ihrer Familie aus den Niederlanden an und war mit ihrer Schwester Margot und ihrer Mutter Edith im Frauenlager. Ende Oktober wurden die Schwestern nach Bergen-Belsen gebracht, wo beide Anfang 1945 starben. Edith starb im Januar 1945 hier in Birkenau.",
        fr: "Anne Frank est arrivée des Pays-Bas avec sa famille en septembre 1944 et a été détenue dans le camp des femmes avec sa sœur Margot et sa mère Edith. Fin octobre, les deux sœurs furent transférées à Bergen-Belsen, où elles sont mortes au début de 1945. Edith est morte ici, à Birkenau, en janvier 1945.",
        lb: "D’Anne Frank ass am September 1944 mat hirer Famill aus Holland ukomm a war mat hirer Schwëster Margot an hirer Mamm Edith am Fraelager. Enn Oktober goufen déi zwou Schwësteren op Bergen-Belsen bruecht, wou béid Ufank 1945 gestuerwe sinn. D’Edith ass am Januar 1945 hei zu Birkenau gestuerwen."}}],
     src: ["a2", "anne"]}
  ]
};

export {SRC};
