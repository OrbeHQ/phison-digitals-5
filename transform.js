// transform.js — Phison Digitals rebrand on the Emmpo template (changers.studio).
// Idempotent: reads pristine inputs from BUILD, writes index.pretty.html to OUT. Re-run, never hand-edit.

const fs = require('fs');
const BUILD = 'C:/Users/anani/AppData/Local/Temp/opencode/phison-emmpo/';
const OUT = 'C:/Users/anani/Playground/rebranding/phison-digitals-5/';

const U = (id, w) => 'https://images.unsplash.com/' + id + '?q=80&w=' + w + '&auto=format&fit=crop';
const V = id => 'https://assets.mixkit.co/videos/' + id + '/' + id + '-720.mp4';
const PH = {
  jewel: 'photo-1611591437281-460bfbe1220a', beauty: 'photo-1512496015851-a90fb38ba796',
  fashion: 'photo-1469334031218-e382a71b716b', neonphone: 'photo-1533750349088-cd871a92f312',
  portrait: 'photo-1524504388940-b1c1722653e1', shopping: 'photo-1492707892479-7bc8d5a4ee93',
  neonsign: 'photo-1557804506-669a67965ba0', marketing: 'photo-1563986768609-322da13575f3',
  mobile: 'photo-1611926653458-09294b3142bf', watch: 'photo-1523275335684-37898b6baf30',
  meeting: 'photo-1600880292203-757bb62b4baf',
};

let html = fs.readFileSync(BUILD + 't.pretty.html', 'utf8').replace(/\r\n/g, '\n');
let css = fs.readFileSync(BUILD + 'main.css', 'utf8');
let js = fs.readFileSync(BUILD + 'main.js', 'utf8');
const log = [];
const counts = {};

function rep(find, replaceWith, name) {
  const n = html.split(find).length - 1;
  if (!n) log.push('MISS!! ' + name);
  else log.push(name + ': ' + n);
  html = html.split(find).join(replaceWith);
}
function repRe(regex, replaceWith, name) {
  const n = (html.match(regex) || []).length;
  if (!n) log.push('MISS!! ' + name);
  else log.push(name + ': ' + n);
  html = html.replace(regex, replaceWith);
}
const base64 = f => fs.readFileSync(BUILD + 'asset-' + f).toString('base64');
const uri = (f, mime) => 'data:' + mime + ';base64,' + base64(f);

// ============================ P0 — head ============================
rep('<title>Emmpo</title>', '<title>Phison Digitals | Social Media Agency Built for Growth</title>\n  <meta name="description" content="Addis Ababa-based social media agency turning brand goals into scroll-stopping content, paid campaigns, and measurable growth.">', 'P0 title+desc');
repRe(/[ \t]*<link rel="preload" href="assets\/[^"]*" as="(?:font|image)"[^>]*>\n/g, () => '', 'P0 preloads strip x4');
rep('<link rel="icon" type="image/x-icon" sizes="192x192" href="assets/688b78c4178800aa2bf8.ico">', '  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 64 64%27%3E%3Crect width=%2764%27 height=%2764%27 rx=%2712%27 fill=%27%23F8FE23%27/%3E%3Ctext x=%2732%27 y=%2745%27 font-family=%27monospace%27 font-weight=%27700%27 font-size=%2740%27 text-anchor=%27middle%27 fill=%27%23161414%27%3EP%3C/text%3E%3C/svg%3E">', 'P0 favicon');
repRe(/[ \t]*<script defer="defer" src="main\.js"><\/script>\n/, () => '', 'P0 main.js tag strip');
repRe(/[ \t]*<script type="module" src="https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js[^>]*><\/script>\n/, () => '', 'P0 cloudflare beacon strip');

// ============================ P1 — CSS: fonts data-URI + image swaps + inline ============================
css = css.replace(/url\(assets\/07070ee11dc38bfbd060\.woff\)/g, () => 'url(' + uri('07070ee11dc38bfbd060.woff', 'font/woff') + ')');
css = css.replace(/url\(assets\/b44b93a780ecd8dbafec\.woff\)/g, () => 'url(' + uri('b44b93a780ecd8dbafec.woff', 'font/woff') + ')');
css = css.replace(/url\(assets\/bd8de66be4175fed48a7\.woff\)/g, () => 'url(' + uri('bd8de66be4175fed48a7.woff', 'font/woff') + ')');
css = css.replace(/url\(assets\/c77ea51aaaf5f15bd55d\.woff\)/g, () => 'url(' + uri('c77ea51aaaf5f15bd55d.woff', 'font/woff') + ')');
css = css.replace(/url\(assets\/dd34dea82ffd23ec2838\.woff\)/g, () => 'url(' + uri('dd34dea82ffd23ec2838.woff', 'font/woff') + ')');
log.push('P1 fonts data-uri x5');
const BRAND_CSS = '\n/* — Phison brand layer — */\n.heading.heading-text{width:auto!important;white-space:nowrap;font-family:"Montreal";font-weight:700;text-transform:uppercase;color:#f8fe23;font-size:calc(34px + 34*(100vw - 375px)/584);line-height:1;letter-spacing:-0.02em}\n.heading-text-lg{width:auto!important;white-space:nowrap;font-family:"Montreal";font-weight:700;text-transform:uppercase;color:#f8fe23;font-size:calc(72px + 72*(100vw - 960px)/960);line-height:1;letter-spacing:-0.04em}\n.heading-text-gallery{font-family:"Montreal";font-weight:700;text-transform:uppercase;color:#f8fe23;font-size:calc(84px + 84*(100vw - 960px)/960);line-height:1;letter-spacing:-0.04em}\n';
rep('<link href="main.css" rel="stylesheet">', '<style>\n' + css + BRAND_CSS + '\n</style>', 'P1 inline css');

// ============================ P2 — preloader + header ============================
rep('<div class="preloader__elem preloader__text">Emmpo</div>', '<div class="preloader__elem preloader__text">Phison</div>', 'P2 preloader text');
rep('>Emmpo</span>', '>Phison</span>', 'P2 logo spans x4');
rep('<span class="mobile-hidden">Our</span> courses', '<span class="mobile-hidden">Our</span> services', 'P2 our services 1');
rep('>Our courses</span>', '>Our services</span>', 'P2 our services elem-2');
rep('aria-label="Our courses"', 'aria-label="Our services"', 'P2 our services aria');
// courses menu labels (2 spans each) + scroll ids
rep('>Tech Life Hacks</span>', '>Content Creation</span>', 'P2 menu cc x2');
rep('>Beyond Today</span>', '>Social Advertising</span>', 'P2 menu sa x2');
rep('>Creativity Crew</span>', '>Growth & Analytics</span>', 'P2 menu ga x2');
rep('data-scroll-to="tech-life-hacks"', 'data-scroll-to="content-creation"', 'P2 scrollTo cc');
rep('data-scroll-to="beyond-today"', 'data-scroll-to="social-advertising"', 'P2 scrollTo sa');
rep('data-scroll-to="creativity-crew"', 'data-scroll-to="growth-analytics"', 'P2 scrollTo ga');

// ============================ P3 — hero ============================
rep('<span class="main__title-top animated-main">Your Career</span>', '<span class="main__title-top animated-main">Your Brand</span>', 'P3 hero top');
rep('<span class="main__title-elem animated-main">journey</span>', '<span class="main__title-elem animated-main">voice</span>', 'P3 hero elem 1');
rep('<span class="main__title-elem animated-main">start here</span>', '<span class="main__title-elem animated-main">starts here</span>', 'P3 hero elem 2');
rep('Guiding You through Career <br> choices and Relevant degrees', 'Guiding you through strategy, <br> content, and campaigns that grow', 'P3 hero text');

// ============================ P4 — career (#what) ============================
rep('<span class="_c-accent">careers</span> where <br> you can make <br> a difference!', '<span class="_c-accent">services</span> where <br> we make <br> a difference!', 'P4 career title');
rep('Through our Career Guidance Quiz', 'Through a quick brand review', 'P4 career box title');
rep('You find the careers that you would most likely Enjoy and are good at.', 'We find the content your audience actually enjoys and responds to.', 'P4 career box text');
rep('Creativity, <br> Sustainability, <br> and Tech.', 'Strategy, <br> Content, <br> and Growth.', 'P4 career heading');

// ============================ P5 — explore (#why) ============================
rep('Explore exciting careers like:', 'Explore exciting work like:', 'P5 explore title');
rep('>Multimedia</span> <span>artist</span>', '>Content</span> <span>creation</span>', 'P5 explore item 1 x2');
rep('>Sustainable</span> <span>fashion</span>', '>Social</span> <span>advertising</span>', 'P5 explore item 2 x2');
rep('>Renewable</span> <span>energy</span>', '>Community</span> <span>growth</span>', 'P5 explore item 3 x2');
rep('>Environmental</span> <span>marketing</span>', '>Analytics</span> <span>reporting</span>', 'P5 explore item 4 x2');
rep('>Green</span> <span>entrepreneurship</span>', '>Brand</span> <span>strategy</span>', 'P5 explore item 5 x2');

// ============================ P6 — discover (#how) ============================
rep('Discover your future!', 'Discover your growth plan!', 'P6 discover title');
rep('Find which careers match <br> your personality.', 'Find which strategies match <br> your brand.', 'P6 discover subtitle');
rep('Take the Quiz and receive <br> recommendations just <br> for You!', 'Tell us your goals and <br> get a plan made just <br> for you!', 'P6 discover text');
rep('<span class="_c-accent">Top 15+</span> tech and sustainability careers for your personality.', '<span class="_c-accent">Top 3</span> platform priorities for your brand and budget.', 'P6 discover item 1');
rep('<span class="_c-accent">Relevant degree</span> options for each recommended career!', '<span class="_c-accent">Month-one plan</span> for every priority we recommend!', 'P6 discover item 2');

// ============================ P7 — science ============================
rep('The <span class="_c-accent">science</span> <br> behind the quiz', 'The <span class="_c-accent">method</span> <br> behind the results', 'P7 science title');
rep('We leverage a model that is based on', 'We leverage a model that is based on', 'P7 science heading (keep)');
rep('vocational psychology research that has been validated in studies repeatedly during the last 50 years, making it a <span class="_italic _bold">scientifically grounded tool <br> for career</span> assessment and guidance.', 'audience research and platform data, refined across three years of live campaigns, making it a <span class="_italic _bold">practically grounded tool <br> for growth</span> planning and creative decisions.', 'P7 science text');

// ============================ P8 — person (#about) ============================
rep('The person behind the quiz', 'The team behind the work', 'P8 person title');
rep('>Follow my Instagram</span>', '>Chat with us on Telegram</span>', 'P8 person instagram x2');

// ============================ P9 — talents ============================
rep('It\'s great to see you <br> on <span class="_c-accent">your journey</span> to <br> discovering your ', 'It\'s great to see you <br> on <span class="_c-accent">your journey</span> to <br> growing your ', 'P9 talents title');
rep('studying Politics and Law, worked as <br> human rights advocacy - only to realize <br> <span class="_italic _bold">my true passion lies in Creativity.</span>', 'posting for friends and local shops, learning <br> every algorithm and format — only to realize <br> <span class="_italic _bold">my true passion lies in growth.</span>', 'P9 talents text 1');
rep('Now, I\'m all about helping <br> you thrive!', 'Now, we\'re all about helping <br> your brand thrive!', 'P9 talents item title');
rep('providing online education, I\'ve learned <br> that the key to supporting you is <span class="_italic _bold">helping <br> you uncover</span> your strengths and passions.', 'running social campaigns, I\'ve learned <br> that the key to growing you is <span class="_italic _bold">helping <br> you uncover</span> your voice and your audience.', 'P9 talents text 2');
rep('Your interests and values are <br> your guiding stars <span class="_c-accent"> to happiness <br> and success. </span>', 'Your goals and audience are <br> your guiding stars <span class="_c-accent"> to reach <br> and results. </span>', 'P9 talents title-small');
rep('Our Quiz is designed to assist you', 'Our process is designed to assist you', 'P9 talents heading 2');
rep('in exploring <span class="_italic _bold">new career paths</span> that you <br> may not have previously known about or <br> thought possible for you.', 'in exploring <span class="_italic _bold">new content paths</span> that you <br> may not have previously known about or <br> thought possible for you.', 'P9 talents text 3');

// ============================ P10 — community ============================
rep('Join our community of 30,000+ students!', 'Join the brands growing with us!', 'P10 community overtitle');
rep('More than 30,000 girls from <span class="_c-accent">193 countries</span> have already taken our Quiz.', 'More than <span class="_c-accent">100K+ potential customers</span> reached through our campaigns.', 'P10 community title');
rep('Here’s what they are saying:', 'Here’s what that looks like:', 'P10 community subtitle');

// ============================ P11 — social ============================
rep('>Instagram</span>', '>Telegram</span>', 'P11 instagram label x4');
rep('>TikTok</span>', '>Email</span>', 'P11 tiktok label x4');
rep('>Discord</span>', '>Phone</span>', 'P11 discord label x4');
rep('Are you a girl who loves technology <br> and creativity?', 'Is your brand ready to grow <br> and be heard?', 'P11 gallery text 1');
rep('So go out there and make <br> something amazing!', 'So let\'s get out there and make <br> something amazing!', 'P11 gallery text 2');
rep('This will help you make a more informed <br> decision about your future career.', 'This will help you make every post <br> count toward real growth.', 'P11 gallery text 4');

// ============================ P12 — footer + modal ============================
rep('Best, Marija</span>', 'Best, Phison</span>', 'P12 modal signoff');
rep('Follow us on <span class="_c-accent">Discord / TikTok / Instagram</span> for updates and community!', 'Reach us on <span class="_c-accent">Telegram / Email / Phone</span> for updates and new work!', 'P12 modal caption');
rep('<div class="footer__copyrights-elem animated">Emmpo</div>', '<div class="footer__copyrights-elem animated">Phison Digitals</div>', 'P12 footer brand home');
rep('<div class="footer__copyrights-elem">Emmpo</div>', '<div class="footer__copyrights-elem">Phison Digitals</div>', 'P12 footer brand courses');
rep('<div class="footer__copyrights-elem animated">2025</div>', '<div class="footer__copyrights-elem animated">2026</div>', 'P12 footer year home');
rep('<div class="footer__copyrights-elem">2025</div>', '<div class="footer__copyrights-elem">2026</div>', 'P12 footer year courses');

// ============================ P13 — courses page ============================
rep('<h2 class="courses-main__title title">Build Your</h2>', '<h2 class="courses-main__title title">Grow Your</h2>', 'P13 courses title');
rep('One Course at a Time', 'One Campaign at a Time', 'P13 courses text');
// catalog groups (ids + titles)
rep('id="tech-life-hacks"', 'id="content-creation"', 'P13 id cc');
rep('id="beyond-today"', 'id="social-advertising"', 'P13 id sa');
rep('id="creativity-crew"', 'id="growth-analytics"', 'P13 id ga');
rep('<h2 class="catalog__title title">Tech Life Hacks</h2>', '<h2 class="catalog__title title">Content Creation</h2>', 'P13 catalog title cc');
rep('<h2 class="catalog__title title">Beyond today</h2>', '<h2 class="catalog__title title">Social Advertising</h2>', 'P13 catalog title sa');
rep('<h2 class="catalog__title title">Creativity crew</h2>', '<h2 class="catalog__title title">Growth & Analytics</h2>', 'P13 catalog title ga');
// card titles
rep('>Sustainable wardrobe</h3>', '>Content Engine</h3>', 'P13 card t1');
rep('>Skincare</h3>', '>Reels & Stories</h3>', 'P13 card t2');
rep('>Air polution</h3>', '>Festive Sprint</h3>', 'P13 card t3');
rep('>Light polution</h3>', '>Always-On Ads</h3>', 'P13 card t4');
rep('>Share your story</h3>', '>Brand Storytelling</h3>', 'P13 card t5');
rep('>Interior design</h3>', '>Community Care</h3>', 'P13 card t6');
rep('>Green ecosystems</h3>', '>Monthly Insight</h3>', 'P13 card t7');
rep('>Jewellery design</h3>', '>Diva Jewellery</h3>', 'P13 card t8');
// card subtitles (scoped: nearest preceding new title, lazy gap)
const SUBS = [
  ['Content Engine', 'Twelve posts a month'], ['Reels & Stories', 'Short-form video'],
  ['Festive Sprint', 'Seasonal push'], ['Always-On Ads', 'Daily management'],
  ['Brand Storytelling', 'Campaign videos'], ['Community Care', 'Engagement handling'],
  ['Monthly Insight', 'Analytics and reporting'], ['Diva Jewellery', 'Launch case study'],
];
SUBS.forEach(([title, sub]) => {
  const rx = new RegExp('(>' + title + '</h3>[\\s\\S]{0,700}?)>[^<]*course', '');
  // fallback: replace the subtitle text right after this title
  const seg = html.split('>' + title + '</h3>');
  if (seg.length < 2) { log.push('MISS!! P13 sub scope ' + title); return; }
  let n = 0;
  for (let i = 1; i < seg.length; i++) {
    const m = seg[i].match(/^(?:[^<]|<[^p])*<p class="catalog__item-subtitle">([^<]*)<\/p>/);
    if (m && /course/i.test(m[1])) {
      seg[i] = seg[i].replace(m[0], m[0].replace('>' + m[1] + '<', '>' + sub + '<'));
      n++;
    }
  }
  html = seg.join('>' + title + '</h3>');
  log.push('P13 subtitle ' + title + ' -> ' + sub + ': ' + n);
});
// info section
rep('Discover your <br> ideal career in just <br> <span class="_c-accent-2">10 minutes!</span>', 'Discover your <br> ideal plan in just <br> <span class="_c-accent-2">10 minutes!</span>', 'P13 info heading');
rep('Take our brief quiz <span class="_c-accent">for personalized career</span> recommendations.', 'Tell us about your brand <span class="_c-accent">for a personalized growth</span> plan.', 'P13 info text');

// ============================ P14 — links global ============================
rep('https://emmpo.calculators.cx/quiz', 'https://t.me/phisondigitals', 'P14 quiz links');
rep('https://www.instagram.com/emmpocareerquiz?igsh=MW14bWFlNXUxMHJ0Zg%3D%3D&utm_source=qr', 'https://t.me/phisondigitals', 'P14 instagram links');
rep('https://www.tiktok.com/@emmpoquiz', 'mailto:phisondigitals@gmail.com', 'P14 tiktok links');
rep('https://discord.com/invite/K97kh26Yhb', 'tel:+251989915436', 'P14 discord links');
rep('>Take the Quiz</span>', '>Start a project</span>', 'P14 quiz label spans');
rep('Take the Quiz </a>', 'Start a project </a>', 'P14 footer title courses');
rep('>Take the Quiz</a>', '>Start a project</a>', 'P14 footer/quiz links');
['sustainable-wardrobe.html', 'skincare.html', 'air-polution.html', 'light-polution.html', 'share-your-story.html', 'interior-design.html', 'green-ecosystems.html', 'jewellery-design.html'].forEach(p => {
  rep('href="' + p + '"', 'href="https://t.me/phisondigitals" target="_blank"', 'P14 subpage ' + p);
});

// ============================ P15 — media swaps ============================
// text-baked images -> styled text
rep('<img src="assets/c245b796482cd96b1c69.png" alt="Heading" class="heading" data-speed="0.92">', '<div class="heading heading-text" data-speed="0.92">Strategy</div>', 'P15 heading career 1');
rep('<img src="assets/6c1be00974631045e412.png" alt="Heading" class="heading" data-speed="0.92">', '<div class="heading heading-text" data-speed="0.92">Content</div>', 'P15 heading career 2');
rep('<img src="assets/37aeb91068274a7e3f5e.png" alt="Heading" class="heading" data-speed="0.92">', '<div class="heading heading-text" data-speed="0.92">Growth</div>', 'P15 heading career 3');
rep('<img src="assets/7a485f680df011d1a5cf.png" alt="Heading" class="heading" data-speed="0.92">', '<div class="heading heading-text" data-speed="0.92">Audience</div>', 'P15 heading science 1');
rep('<img src="assets/2589fb691eae19d97926.png" alt="Heading" class="heading" data-speed="0.92">', '<div class="heading heading-text" data-speed="0.92">Creative</div>', 'P15 heading science 2');
rep('<img src="assets/27a3c47fc7e52aff4c99.png" alt="Heading" class="heading" data-speed="0.92">', '<div class="heading heading-text" data-speed="0.92">Data</div>', 'P15 heading science 3');
rep('<img src="assets/22234ac77fdff7b042b9.png" alt="Heading" class="heading" data-speed="0.97">', '<div class="heading heading-text" data-speed="0.97">thrive</div>', 'P15 heading talents');
rep('<img src="assets/af3020a78265de970759.png" alt="Talents" class="talents__subtitle">', '<div class="talents__subtitle heading-text-lg">brand</div>', 'P15 talents subtitle');
rep('<img src="assets/f71612997f774f56ffe7.png" alt="Future" class="courses-main__subtitle">', '<div class="courses-main__subtitle heading-text-lg">Brand</div>', 'P15 courses subtitle');
rep('<img src="assets/e329b1b09ab707b7e116.png" alt="Image" class="social-gallery__heading">', '<div class="social-gallery__heading heading-text-gallery">COMMUNITY</div>', 'P15 gallery heading');
// small decorative assets -> data-URI (html refs + css refs)
const DU = [
  ['51deafe99e147c5239b2.png', 'image/png'], ['1ff72e083948ed8398ca.png', 'image/png'],
  ['0a541af8d51a8cd9d385.png', 'image/png'], ['14a63beaade41576d97b.png', 'image/png'],
  ['14ea73f24fcbd4788006.png', 'image/png'], ['2064d8eb5a5e06c78c81.png', 'image/png'], ['93a8c42a985ea98e331a.png', 'image/png'],
  ['6d8efdbccb05b49b8d0c.png', 'image/png'], ['03669f3574d05eaf21d3.png', 'image/png'],
  ['99f4565f4e681901c243.png', 'image/png'], ['8984761ff88374cd251c.png', 'image/png'],
  ['80d47a5c28b9b9a49c0a.svg', 'image/svg+xml'], ['eee17b2c8a8cf42b0fb3.png', 'image/png'],
  ['a6e8c751f1d705c2a6e9.png', 'image/png'],
];
DU.forEach(([f, mime]) => {
  const n = html.split('assets/' + f).length - 1;
  html = html.split('assets/' + f).join(uri(f, mime));
  log.push('P15 data-uri ' + f + ': ' + n);
});
// content photos -> Unsplash
const W = { bg: 1800, mid: 1200, small: 900 };
const IMG = [
  ['846faa9c110b840e7cd7.png', U(PH.marketing, W.bg)], ['5429b28379e2f75b999c.png', U(PH.marketing, 800)],
  ['03f2ad46425158c491db.png', U(PH.fashion, W.bg)], ['cd18d61ca7b9aec78be6.png', U(PH.neonphone, W.bg)],
  ['8db85a30b1736a08913f.png', U(PH.neonsign, W.bg)], ['9690d9e379e0dba7d893.png', U(PH.watch, W.bg)],
  ['04b27a2c53c793038c17.png', U(PH.beauty, W.bg)],
  ['f8c7d7665849f7d24b99.png', U(PH.jewel, W.mid)], ['3dc17292ee9c10d13b64.png', U(PH.shopping, W.mid)],
  ['f8c26a3a983864ec4c8f.png', U(PH.portrait, W.mid)], ['0710f2b66fbeb1d1969b.png', U(PH.meeting, W.mid)],
  ['72e05126e506faaaf8b6.png', U(PH.mobile, W.mid)],
  ['4fbb40b07af6f682db96.png', U(PH.jewel, W.mid)], ['601577b96b18bd5ad582.png', U(PH.shopping, W.mid)],
  ['23328bbf22f42ecf852a.png', U(PH.portrait, W.mid)], ['8ef7901dbe5edf86b8b0.png', U(PH.beauty, W.mid)],
  ['19fe6ba1416662966d9a.png', U(PH.marketing, W.mid)], ['4ad5ec5a3db01004cdd0.png', U(PH.neonphone, W.mid)],
  ['e9b2fd43c75746583eb5.png', U(PH.fashion, W.bg)], ['b5cc2d4c586da3970f76.png', U(PH.mobile, W.bg)],
  ['7d73da477e4a14cd5ebf.png', U(PH.meeting, W.mid)], ['2ffd93e449b9c38c6203.png', U(PH.watch, W.mid)],
  ['c0eb7fdf5673f312a5cc.png', U(PH.neonsign, W.mid)],
  ['ce3c8196da068a1ba841.png', U(PH.shopping, W.bg)], ['c1613401b1dc979fd5ba.png', U(PH.fashion, W.mid)],
  ['0938d285bb5586813ed2.png', U(PH.neonsign, W.bg)], ['df7173a9b6ce5296f09b.png', U(PH.portrait, W.bg)],
  ['015b0abcd9f6857596dd.png', U(PH.portrait, W.mid)], ['19685070beb1700a065e.png', U(PH.fashion, W.mid)],
  ['96bc32349c71f8ada495.png', U(PH.jewel, W.mid)], ['0ef1120be377127bff85.png', U(PH.marketing, W.mid)],
  ['26dc59fb58b7d7384916.png', U(PH.beauty, W.bg)],
  ['dd22341dae808d910395.png', U(PH.shopping, W.mid)], ['68dbb3529ef7e3ddd827.png', U(PH.meeting, W.mid)],
  ['99d8d9d6f871569ac6a2.png', U(PH.watch, W.mid)], ['252fc8e319ae8b8e2099.png', U(PH.neonphone, W.bg)],
  ['c5faf727b3a702e9cb46.png', U(PH.jewel, W.bg)], ['9093b24175be70fd9705.png', U(PH.fashion, W.mid)],
  ['bd54b336fe8a1578518c.png', U(PH.jewel, W.mid)], ['5d8e83a8acb1e91a2524.png', U(PH.shopping, W.mid)],
  ['e5a5f7527a35682f0f3c.png', U(PH.watch, W.mid)], ['fa4926cbcadb447bd89d.png', U(PH.beauty, W.mid)],
  ['877390e8023f2471770d.png', U(PH.portrait, W.mid)], ['4c9637b9dfc98f809bab.png', U(PH.neonsign, W.mid)],
  ['44defe13f60b358970ac.png', U(PH.meeting, W.mid)], ['44e6599e5fcef020a716.png', U(PH.portrait, W.mid)],
  ['7e430397325c44c01a70.png', U(PH.fashion, W.bg)], ['80db5c615a851f0355d1.png', U(PH.fashion, 800)],
  ['ad5047371bc93683ee18.png', U(PH.jewel, W.mid)], ['24a424382a28e3b32b7b.png', U(PH.shopping, W.mid)],
  ['59c29996afba540cb740.png', U(PH.watch, W.mid)], ['e9b8edaa4e668dc4b97a.png', U(PH.portrait, W.mid)],
  ['2befd40a318f458c39cb.png', U(PH.beauty, W.mid)], ['0c62b6a646f66d4e6e54.png', U(PH.meeting, W.mid)],
  ['5a3a915f51a896689984.png', U(PH.neonphone, W.mid)], ['de372e6a231adf93b66e.png', U(PH.fashion, W.mid)],
  ['c5c0c87ebd25abbada14.png', U(PH.mobile, W.mid)], ['0e201813c69b95105df6.png', U(PH.marketing, W.bg)],
];
IMG.forEach(([f, url]) => {
  const n = html.split('assets/' + f).length - 1;
  const c = css.split('assets/' + f).length - 1;
  html = html.split('assets/' + f).join(url);
  css = css.split('assets/' + f).join(url);
  // the inline style was already embedded in P1 — swap inside html too
  html = html.split('url(assets/' + f + ')').join('url(' + url + ')');
  log.push('P15 unsplash ' + f + ': html ' + n + ' css ' + c);
});
// video -> mixkit
rep('src="assets/395808beb2e10735b70b.mp4"', 'src="' + V(44556) + '"', 'P15 video');

// ============================ P16 — JS inline + runtime ============================
const jsMail = (js.match(/fetch\("\.\/mail\.php"/g) || []).length;
js = js.split('(await fetch("./mail.php",{method:"POST",body:r}))').join('(await Promise.resolve({ok:!0}))');
log.push('P16 js mail.php stub: ' + jsMail);
// blanket swap: any remaining assets/ in JS -> data-URI (images) or mixkit (videos)
const jsAssetTokens = [...new Set([...js.matchAll(/assets\/([\w.]+)/g)].map(m => m[1]))];
const MIXKIT_VIDS = [44556, 20877, 34611, 41180, 25586, 44555, 47213, 4915];
let mixkitIdx = 0;
const jsUnsplash = [PH.fashion, PH.portrait, PH.shopping, PH.meeting, PH.beauty, PH.jewel, PH.fashion, PH.portrait];
jsAssetTokens.forEach(f => {
  const n = (js.match(new RegExp('assets/' + f.replace(/\./g, '\\.'), 'g')) || []).length;
  if (f.endsWith('.mp4')) {
    const vid = MIXKIT_VIDS[mixkitIdx % MIXKIT_VIDS.length];
    mixkitIdx++;
    js = js.split('assets/' + f).join(V(vid));
    log.push('P16 js video ' + f + ' -> mixkit ' + vid + ': ' + n);
  } else if (f.endsWith('.woff')) {
    js = js.split('assets/' + f).join('data:font/woff;base64,' + base64(f));
    log.push('P16 js font ' + f + ': ' + n);
  } else {
    try {
      const mime = f.endsWith('.svg') ? 'image/svg+xml' : 'image/png';
      const stat = fs.statSync(BUILD + 'asset-' + f);
      if (stat.size < 200000) {
        js = js.split('assets/' + f).join('data:' + mime + ';base64,' + base64(f));
        log.push('P16 js img data-uri ' + f + ': ' + n);
      } else {
        const pid = jsUnsplash[mixkitIdx % jsUnsplash.length];
        mixkitIdx++;
        js = js.split('assets/' + f).join(U(pid, 1200));
        log.push('P16 js img unsplash ' + f + ': ' + n);
      }
    } catch (e) { log.push('P16 js asset SKIP ' + f + ': ' + e.code); }
  }
});
const bundle = '<script>\n' + js.replace(/<\/script/g, '<\\/script') + '\n</script>';
rep('</body>', bundle + '\n  <script>\n' + [
  "(function(){'use strict';",
  "  setTimeout(function(){",
  "    var p = document.querySelector('.preloader');",
  "    if (p) {",
  "      var cs = getComputedStyle(p), r = p.getBoundingClientRect();",
  "      if (cs.display !== 'none' && parseFloat(cs.opacity || '1') > 0.05 && r.bottom > innerHeight * 0.5) {",
  "        p.style.transition = 'opacity .6s ease'; p.style.opacity = '0'; p.style.pointerEvents = 'none';",
  "        document.body.style.overflow = '';",
  "        setTimeout(function(){ if (p.parentNode) p.parentNode.removeChild(p); }, 700);",
  "      }",
  "    }",
  "  }, 12000);",
  "})();",
].join('\n') + '\n  </script>\n</body>', 'P16 js+runtime inline');

// ============================ P17 — assertions ============================
const mustZero = [/[>"\s]emmpo[<\s"\/]/i, /calculators\.cx/i, /marija/i, /girls/i, /30,000/, /193 countries/i, /vocational/i, /multimedia/i, /sustainable<\/span>/i, /renewable/i, /environmental/i, /entrepreneurship/i, /tech life hacks/i, /beyond today/i, /creativity crew/i, /sustainable wardrobe/i, /skincare/i, /air polution/i, /light polution/i, /interior design/i, /green ecosystems/i, /jewellery design/i, /assets\//, /discord/i, /tiktok/i, /instagram/i, /assets\//, /changers/i, /degree/i, /cloudflare/i, /mail\.php/];
const bad = [];
mustZero.forEach(rx => { const m = html.match(rx); if (m) { const at = html.indexOf(m[0]); bad.push(rx.source + ' :: ' + JSON.stringify(html.slice(Math.max(0, at - 50), at + 70))); } });
if (bad.length) { log.push('ASSERT FAIL x' + bad.length); bad.forEach(b => log.push('  LEFTOVER!! ' + b)); }
else log.push('ASSERT: zero template leftovers');
const mustHave = ['Phison', 'Phison Digitals', 'phisondigitals@gmail.com', 't.me/phisondigitals', 'Start a project', 'Your Brand', 'voice', 'starts here', 'Strategy, <br> Content, <br> and Growth.', 'Explore exciting work like:', 'Content', 'creation', 'Discover your growth plan!', 'behind the results', 'The team behind the work', 'brand', 'thrive', '100K+ potential customers', 'COMMUNITY', 'Grow Your', 'One Campaign at a Time', 'Content Creation', 'Social Advertising', 'Growth & Analytics', 'Content Engine', 'Reels & Stories', 'Festive Sprint', 'Always-On Ads', 'Brand Storytelling', 'Community Care', 'Monthly Insight', 'Diva Jewellery', 'Best, Phison', 'images.unsplash.com', 'data:font/woff', 'mixkit.co/videos/44556', 'heading-text', 'Chat with us on Telegram'];
const missing = mustHave.filter(s => !html.includes(s));
if (missing.length) missing.forEach(s => log.push('MISSING!! marker ' + s));
log.push('MARKERS: ' + (mustHave.length - missing.length) + '/' + mustHave.length);
counts.section = (html.match(/<section/g) || []).length;
counts.img = (html.match(/<img/g) || []).length;
counts.a = (html.match(/<a /g) || []).length;
counts.script = (html.match(/<script/g) || []).length;
log.push('COUNTS ' + JSON.stringify(counts));

fs.writeFileSync(OUT + 'index.pretty.html', html);
log.push('WROTE ' + OUT + 'index.pretty.html (' + html.length + ' bytes)');
console.log(log.join('\n'));
