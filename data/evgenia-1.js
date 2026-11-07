addWeek('evgenia', {
t: 'Дом: комнаты и мебель', e: '🏠', g: 'There is / There are',
tip: 'There is + один предмет (a/an). There are + несколько. Вопрос: Is there…? Are there…? Перед гласным звуком — an.',
l: `<p><b>There is</b> — «есть, находится» (один предмет). <b>There are</b> — несколько предметов.</p>
<div class="ex">There <b>is</b> a sofa in the room.<br>There <b>are</b> two chairs in the kitchen.</div>
<p>Вопрос: <b>Is there</b> a lamp? — Yes, there is. / No, there isn't.<br>Отрицание: There <b>isn't</b> a… / There <b>aren't</b> any…</p>
<p>Артикль: <b>a</b> перед согласным звуком (a table), <b>an</b> перед гласным (an armchair).</p>`,
v: `house=дом; flat=квартира; room=комната; living room=гостиная; bedroom=спальня; kitchen=кухня; bathroom=ванная; toilet=туалет; hall=прихожая; garden=сад; balcony=балкон; door=дверь; window=окно; floor=пол; wall=стена; ceiling=потолок; stairs=лестница; sofa=диван; armchair=кресло; table=стол; chair=стул; bed=кровать; wardrobe=шкаф для одежды; shelf=полка; lamp=лампа; carpet=ковёр; mirror=зеркало`,
x: `c|There ___ a sofa in the living room.|is|are
c|There ___ two chairs in the kitchen.|are|is
c|There is ___ armchair in the bedroom.|an|a
c|___ there a lamp on the table?|Is|Are
c|There ___ any books in the hall.|aren't|isn't
t|There ___ a big window in my room. (is/are)|is
t|There ___ three beds in the house. (is/are)|are
o|В моей квартире две спальни.|There are two bedrooms in my flat.
o|В кухне есть холодильник.|There is a fridge in the kitchen.`
});

addWeek('evgenia', {
t: 'Дом: кухня и вещи', e: '🍳', g: 'Предлоги места',
tip: 'in — внутри, on — на поверхности, under — под, next to — рядом, between — между, behind — за, in front of — перед.',
l: `<p>Где находится предмет? Используем <b>предлоги места</b>:</p>
<div class="ex"><b>in</b> — в (in the fridge)<br><b>on</b> — на (on the table)<br><b>under</b> — под (under the bed)<br><b>next to</b> — рядом с<br><b>between</b> — между<br><b>behind</b> — позади, за<br><b>in front of</b> — перед</div>
<p>Схема: <b>The cup is on the table.</b> = Чашка (находится) на столе.</p>`,
v: `fridge=холодильник; cooker=плита; oven=духовка; microwave=микроволновка; sink=раковина; washing machine=стиральная машина; kettle=чайник; plate=тарелка; bowl=миска; cup=чашка; glass=стакан; fork=вилка; knife=нож; spoon=ложка; pan=сковорода; pot=кастрюля; bottle=бутылка; bag=сумка; box=коробка; towel=полотенце; soap=мыло; shower=душ; bath=ванна; toothbrush=зубная щётка; key=ключ; clock=часы; TV=телевизор; computer=компьютер`,
x: `c|The cup is ___ the table. (на)|on|in,under
c|The milk is ___ the fridge. (в)|in|on,behind
c|The cat is ___ the bed. (под)|under|on,between
c|The lamp is ___ the sofa. (рядом)|next to|between,under
c|The bag is ___ the chair and the wall. (между)|between|behind,on
c|The TV is ___ you. (перед)|in front of|behind,in
t|The towel is ___ the bathroom. (в)|in
t|The glass is ___ the table. (на)|on
t|The pan is ___ the cooker. (на / перед — на плите)|on
o|Ключ на столе.|The key is on the table.
o|Чайник рядом с раковиной.|The kettle is next to the sink.`
});

addWeek('evgenia', {
t: 'Семья и люди', e: '👨‍👩‍👧', g: 'To be и притяжательные (’s)',
tip: 'I am, he/she/it is, we/you/they are. Принадлежность: имя + ’s (Tom’s car). Мой = my, твой = your, его = his, её = her.',
l: `<p>Глагол <b>to be</b> (быть):</p>
<div class="ex">I <b>am</b> · he / she / it <b>is</b> · we / you / they <b>are</b></div>
<p>Отрицание: I am <b>not</b>, he <b>isn't</b>, they <b>aren't</b>. Вопрос: <b>Is</b> she your sister? <b>Are</b> they at home?</p>
<p><b>Притяжательный падеж</b>: Tom<b>’s</b> bag = сумка Тома. my sister<b>’s</b> husband = муж моей сестры.</p>
<p>my, your, his, her, our, their — «мой, твой, его, её, наш, их».</p>`,
v: `mother=мама; father=папа; parents=родители; son=сын; daughter=дочь; child=ребёнок; children=дети; brother=брат; sister=сестра; grandmother=бабушка; grandfather=дедушка; husband=муж; wife=жена; uncle=дядя; aunt=тётя; cousin=двоюродный брат / сестра; friend=друг, подруга; boy=мальчик; girl=девочка; man=мужчина; woman=женщина; baby=малыш; family=семья; name=имя; surname=фамилия; age=возраст; old=старый; young=молодой`,
x: `c|I ___ a teacher.|am|is,are
c|She ___ my sister.|is|am,are
c|They ___ from Russia.|are|is,am
c|___ your mother at home?|Is|Are,Am
c|This is ___ car. (машина Тома)|Tom's|Toms,Toms'
c|This is ___ book. (её)|her|she,hers
t|My parents ___ at work. (is/are)|are
t|He ___ not my brother. (is/am/are)|is
t|I ___ happy today. (am/is/are)|am
o|Это сестра моего мужа.|This is my husband's sister.
o|Мы не дома.|We are not at home.`
});

addWeek('evgenia', {
t: 'Еда и напитки', e: '🍎', g: 'a / an / some / any',
tip: 'a/an — один предмет (a banana). some — немного, в утверждении. any — в вопросах и отрицаниях. Неисчисляемое (water, milk) — без a/an.',
l: `<p><b>a / an</b> — один предмет: a banana, <b>an</b> apple.</p>
<p><b>some</b> — немного (утверждение): I have <b>some</b> milk.<br><b>any</b> — вопрос и отрицание: Is there <b>any</b> bread? There isn't <b>any</b> cheese.</p>
<p>Неисчисляемые слова (water, milk, bread, sugar) нельзя считать: <s>a milk</s> → <b>some milk</b> / a glass of milk.</p>
<p>Просьба и предложение: Can I have <b>some</b> water? Would you like <b>some</b> tea?</p>`,
v: `bread=хлеб; butter=масло; cheese=сыр; egg=яйцо; milk=молоко; meat=мясо; chicken=курица; fish=рыба; rice=рис; pasta=макароны; soup=суп; salad=салат; potato=картофель; tomato=помидор; cucumber=огурец; carrot=морковь; onion=лук; apple=яблоко; banana=банан; orange=апельсин; sugar=сахар; salt=соль; water=вода; tea=чай; coffee=кофе; juice=сок; breakfast=завтрак; lunch=обед; dinner=ужин`,
x: `c|I eat ___ apple every day.|an|a,some
c|We have ___ milk in the fridge.|some|a,an
c|Is there ___ bread?|any|an,a
c|I don't want ___ sugar.|any|some,a
c|She has ___ egg for breakfast.|an|a,some
c|Can I have ___ water, please?|some|a,an
t|There aren't ___ tomatoes. (some/any)|any
t|I'd like ___ cup of tea. (a/an)|a
t|He has ___ orange. (a/an)|an
o|Дайте мне, пожалуйста, немного воды.|Can I have some water, please?
o|У нас нет сыра.|We don't have any cheese.`
});

addWeek('evgenia', {
t: 'Мой день', e: '⏰', g: 'Present Simple (утверждение и отрицание)',
tip: 'I/you/we/they + глагол. He/she/it + глагол с -s (works, goes, watches). Отрицание: don\'t / doesn\'t + глагол без -s.',
l: `<p><b>Present Simple</b> — привычки и регулярные действия.</p>
<div class="ex">I / you / we / they <b>work</b><br>he / she / it <b>works</b></div>
<p>Окончания: <b>-s</b> (works), <b>-es</b> после s, sh, ch, o, x (goes, watches), <b>y → ies</b> (study → studies).</p>
<p>Отрицание: I <b>don't</b> work. She <b>doesn't</b> work (глагол без -s!).</p>
<p>Слова-помощники: always, usually, often, sometimes, never, every day.</p>`,
v: `wake up=просыпаться; get up=вставать; wash=мыть, умываться; brush=чистить; have breakfast=завтракать; go=идти, ехать; work=работать; start=начинать; finish=заканчивать; come=приходить; cook=готовить; clean=убирать; eat=есть; drink=пить; watch=смотреть; read=читать; listen=слушать; write=писать; play=играть; sleep=спать; go to bed=ложиться спать; always=всегда; usually=обычно; often=часто; sometimes=иногда; never=никогда; every day=каждый день`,
x: `c|She ___ up at 7 o'clock.|gets|get,getting
c|I ___ breakfast at 8.|have|has,having
c|He ___ TV in the evening.|watches|watchs,watch
c|They ___ to work by bus.|go|goes,going
c|My mother ___ coffee in the morning.|drinks|drink,drinking
t|He ___ in a bank. (to work)|works
t|She ___ to bed at 10. (to go)|goes
t|We ___ TV in the morning. (not / watch)|don't watch/do not watch
t|My brother ___ English. (to study)|studies
o|Я встаю в шесть часов.|I get up at six o'clock.
o|Она не готовит по утрам.|She doesn't cook in the morning.`
});

addWeek('evgenia', {
t: 'Время, дни, числа', e: '📅', g: 'Предлоги времени at / on / in',
tip: 'at + точное время (at 7), on + день (on Monday), in + месяц/сезон/год (in May, in summer). Время: half past, a quarter to/past.',
l: `<p><b>at</b> — точное время: at 7 o'clock, at noon, at night.<br><b>on</b> — дни: on Monday, on Sundays, on my birthday.<br><b>in</b> — месяцы, сезоны, годы: in May, in summer, in 2025, in the morning.</p>
<p><b>Который час?</b> What time is it?<br>7:00 — seven o'clock · 7:15 — a quarter <b>past</b> seven · 7:30 — half <b>past</b> seven · 7:45 — a quarter <b>to</b> eight.</p>
<p>Дни недели и месяцы пишутся с большой буквы!</p>`,
v: `one=один; two=два; three=три; four=четыре; five=пять; six=шесть; seven=семь; eight=восемь; nine=девять; ten=десять; twenty=двадцать; fifty=пятьдесят; hundred=сто; Monday=понедельник; Tuesday=вторник; Wednesday=среда; Thursday=четверг; Friday=пятница; Saturday=суббота; Sunday=воскресенье; today=сегодня; tomorrow=завтра; yesterday=вчера; morning=утро; evening=вечер; night=ночь; week=неделя; month=месяц; year=год; minute=минута; hour=час`,
x: `c|The lesson is ___ Monday.|on|in,at
c|I get up ___ 7 o'clock.|at|on,in
c|We go on holiday ___ summer.|in|on,at
c|My birthday is ___ May.|in|on,at
c|It's half ___ five. (5:30)|past|to,on
c|It's a quarter ___ ten. (9:45)|to|past,at
t|She works ___ night. (at/on/in)|at
t|We have English ___ Friday. (at/on/in)|on
o|Урок начинается в девять часов.|The lesson starts at nine o'clock.
o|Я не работаю по воскресеньям.|I don't work on Sundays.`
});

addWeek('evgenia', {
t: 'Одежда и цвета', e: '👗', g: 'This / that / these / those, множественное число',
tip: 'this/these — близко (рядом). that/those — далеко. Один → this/that, много → these/those. Мн. число: -s, -es (boxes), исключения: child → children, man → men, woman → women, foot → feet.',
l: `<p><b>this</b> (этот, рядом) — <b>these</b> (эти). <b>that</b> (тот, далеко) — <b>those</b> (те).</p>
<div class="ex">This jacket is new. → These jackets are new.<br>That hat is nice. → Those hats are nice.</div>
<p><b>Множественное число:</b> +s (shirt → shirts); +es (dress → dresses, box → boxes); y → ies (baby → babies).</p>
<p><b>Исключения:</b> man → men, woman → women, child → children, foot → feet, tooth → teeth.</p>`,
v: `shirt=рубашка; T-shirt=футболка; sweater=свитер; jacket=куртка; coat=пальто; dress=платье; skirt=юбка; trousers=брюки; jeans=джинсы; shorts=шорты; socks=носки; shoes=туфли, обувь; boots=ботинки, сапоги; hat=шапка, шляпа; scarf=шарф; gloves=перчатки; red=красный; blue=синий, голубой; green=зелёный; yellow=жёлтый; black=чёрный; white=белый; brown=коричневый; pink=розовый; grey=серый; wear=носить (одежду); put on=надевать`,
x: `c|___ shoes here are new. (рядом)|These|This,Those
c|Look at ___ jacket over there! (вдалеке)|that|this,these
c|How much are ___ socks in your hand?|these|this,that
c|One child, two ___.|children|childs,childrens
c|One woman, two ___.|women|womans,womens
c|One dress, two ___.|dresses|dress,dresss
t|One box, two ___. (box)|boxes
t|One foot, two ___. (foot)|feet
o|Эти джинсы синие.|These jeans are blue.
o|Та юбка очень красивая.|That skirt is very beautiful.`
});

addWeek('evgenia', {
t: 'Тело и здоровье', e: '🩺', g: 'Have got / has got',
tip: 'I/you/we/they have got. He/she/it has got. Вопрос: Have you got…? Отрицание: haven\'t got / hasn\'t got.',
l: `<p><b>have got</b> — «иметь, у меня есть» (также для болезней и внешности).</p>
<div class="ex">I / you / we / they <b>have got</b> a car.<br>He / she / it <b>has got</b> blue eyes.</div>
<p>Вопрос: <b>Have</b> you got a brother? — Yes, I have. / No, I haven't.<br>Отрицание: She <b>hasn't got</b> a car.</p>
<p>Болезни: I've got a headache. (У меня болит голова.) He's got a cold. (Он простужен.)</p>`,
v: `head=голова; face=лицо; eye=глаз; ear=ухо; nose=нос; mouth=рот; tooth=зуб; hair=волосы; neck=шея; arm=рука (от плеча); hand=кисть руки; finger=палец; leg=нога; foot=ступня; back=спина; stomach=живот, желудок; heart=сердце; doctor=врач; medicine=лекарство; pain=боль; headache=головная боль; a cold=простуда; ill=больной; healthy=здоровый; tired=усталый; hungry=голодный; thirsty=испытывающий жажду`,
x: `c|I ___ got a headache.|have|has,am
c|She ___ got blue eyes.|has|have,is
c|___ you got a brother?|Have|Has,Do
c|My brother ___ got long hair.|hasn't|haven't,isn't
t|He ___ not got a car. (have/has)|has
t|We ___ got two children. (have/has)|have
c|They ___ got a big house.|have|has,are
o|У меня болит голова.|I have got a headache.
o|У неё нет брата.|She hasn't got a brother.`
});

addWeek('evgenia', {
t: 'Город и места', e: '🏙️', g: 'Повелительное наклонение и направления',
tip: 'Приказ/просьба = глагол без изменений: Turn left! Запрет: Don\'t + глагол: Don\'t cross here! Направления: turn left/right, go straight on.',
l: `<p><b>Imperative</b> — глагол в начальной форме, без «you»:</p>
<div class="ex"><b>Turn</b> left. · <b>Go</b> straight on. · <b>Cross</b> the road.</div>
<p>Запрет: <b>Don't</b> + глагол: <b>Don't</b> cross here! <b>Don't</b> be late!</p>
<p><b>Как пройти?</b> Where is the bank? — It's <b>next to</b> the post office / <b>opposite</b> the park / <b>between</b> the school and the café / <b>on the corner</b>.</p>`,
v: `town=город (небольшой); city=большой город; street=улица; road=дорога; shop=магазин; supermarket=супермаркет; market=рынок; bank=банк; post office=почта; hospital=больница; pharmacy=аптека; school=школа; park=парк; cinema=кинотеатр; restaurant=ресторан; café=кафе; station=вокзал, станция; bus stop=автобусная остановка; bridge=мост; church=церковь; museum=музей; library=библиотека; left=налево; right=направо; straight on=прямо; near=близко; far=далеко; corner=угол`,
x: `c|___ left at the bank. (Поверните)|Turn|Turns,Turning
c|Go ___ and then turn right.|straight on|straight in,straight at
c|___ cross the road here! (Не переходи)|Don't|Not,Doesn't
c|The park is ___ the station and the school. (между)|between|behind,on
c|The cinema is ___ the supermarket. (напротив)|opposite|between,under
t|___ straight on for 100 metres. (to go)|Go
t|The post office is ___ the bank. (рядом с)|next to
t|___ right at the corner. (to turn)|Turn
o|Поверните направо у банка.|Turn right at the bank.
o|Больница далеко отсюда.|The hospital is far from here.`
});
