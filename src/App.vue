<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { t, tr, lang, toggleLang, img, site, wa, goals, types, districts, slots, reviews } from './data'

const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 30 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const f = reactive({ goal: 'rent', type: 'apt', district: 'umh', rooms: 3, budget: 45000, name: '', phone: '' })
const hasRooms = computed(() => ['apt', 'floor', 'villa'].includes(f.type))
const fmt = (n) => n.toLocaleString(lang.value === 'ar' ? 'ar-SA' : 'en-US')
const budgetLabel = computed(() => `${fmt(f.budget)}${f.budget >= 150000 ? t.value.finder.plus : ''} ${t.value.finder.sar}`)
const showBudget = computed(() => f.goal === 'rent')
const err = ref('')
const setGoal = (g) => { f.goal = g; document.getElementById('find')?.scrollIntoView({ behavior: 'smooth' }) }
const send = () => {
  if (!f.name.trim() || !f.phone.trim()) { err.value = t.value.finder.required; return }
  err.value = ''
  const m = t.value.finder.msg
  const pick = (arr, id) => tr(arr.find((x) => x.id === id).t)
  const lines = [m.hello, `${m.goal}: ${pick(goals, f.goal)}`, `${m.type}: ${pick(types, f.type)}`, `${m.district}: ${pick(districts, f.district)}`, hasRooms.value ? `${m.rooms}: ${f.rooms}${f.rooms >= 5 ? '+' : ''}` : null, showBudget.value ? `${m.budget}: ${budgetLabel.value}` : null, `${m.name}: ${f.name.trim()}`, `${m.phone}: ${f.phone.trim()}`].filter(Boolean)
  window.open(wa(lines.join('\n')), '_blank', 'noopener')
}

const cb = reactive({ slot: 'pm', name: '', phone: '' })
const cbErr = ref('')
const callback = () => {
  if (!cb.name.trim() || !cb.phone.trim()) { cbErr.value = t.value.finder.required; return }
  cbErr.value = ''
  const C = t.value.callback, m = t.value.finder.msg
  window.open(wa([C.msg, `${C.mSlot}: ${tr(slots.find((s) => s.id === cb.slot).t)}`, `${m.name}: ${cb.name.trim()}`, `${m.phone}: ${cb.phone.trim()}`].join('\n')), '_blank', 'noopener')
}
const year = new Date().getFullYear()
</script>

<template>
  <!-- نسخة عرض: احذف هذا الشريط عند الإطلاق الرسمي -->
  <div class="demo-ribbon">{{ t.ribbon }}</div>

  <header class="nav" :class="{ scrolled }">
    <div class="container nav-in">
      <a href="#top" class="logo"><b>{{ t.brand }}</b><span>{{ t.brandSub }}</span></a>
      <nav class="links"><a href="#find">{{ t.nav.find }}</a><a href="#owners">{{ t.nav.owners }}</a><a href="#process">{{ t.nav.process }}</a><a href="#reviews">{{ t.nav.reviews }}</a><a href="#visit">{{ t.nav.visit }}</a></nav>
      <div class="acts">
        <button type="button" class="lang" @click="toggleLang">{{ lang === 'ar' ? 'EN' : 'ع' }}</button>
        <a :href="`tel:${site.phone.tel}`" class="call hide-sm"><span dir="ltr">{{ site.phone.label }}</span></a>
      </div>
    </div>
  </header>

  <main>
    <section class="hero" id="top">
      <div class="container hero-in">
        <div class="hero-copy">
          <p class="kicker">{{ t.hero.kicker }}</p>
          <h1><span>{{ t.hero.t1 }}</span><span>{{ t.hero.t2 }}</span><span class="blue">{{ t.hero.t3 }}</span></h1>
          <p class="lead">{{ t.hero.lead }}</p>
          <div class="ctas">
            <button type="button" class="btn btn-navy" @click="setGoal('rent')">{{ t.hero.cta }}</button>
            <button type="button" class="btn btn-line" @click="setGoal('list')">{{ t.hero.owners }}</button>
          </div>
          <ul class="chips">
            <li><i class="ejar" aria-hidden="true"><b></b><b></b><b></b></i>{{ t.hero.ejar }}</li>
            <li><strong>★ {{ site.rating }}</strong> · {{ site.reviews }} {{ t.hero.rate }}</li>
          </ul>
        </div>
        <div class="hero-pics">
          <img class="p1" :src="img('corner-sign.jpg')" alt="" fetchpriority="high" />
          <img class="p2" :src="img('office-interior.jpg')" alt="" />
          <span class="key" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="8" cy="12" r="4.5" /><path d="M12.5 12H22M18 12v3M21 12v2" /></svg></span>
        </div>
      </div>
    </section>

    <div class="band" aria-hidden="true">
      <div class="container band-in"><b>{{ t.brand }} {{ t.brandSub }}</b><span dir="ltr">{{ site.signPhones.map((p) => p.label).join('  ·  ') }}</span></div>
    </div>

    <section class="section finder" id="find">
      <div class="container fd-in">
        <div class="fd-head" v-reveal>
          <p class="kicker">{{ t.finder.kicker }}</p>
          <h2>{{ t.finder.title }}</h2>
          <img :src="img('office-front.jpg')" alt="" loading="lazy" />
        </div>
        <form class="fd-form" novalidate @submit.prevent="send" v-reveal>
          <div class="seg" role="group" :aria-label="t.finder.goal">
            <button v-for="g in goals" :key="g.id" type="button" :class="{ on: f.goal === g.id }" @click="f.goal = g.id">{{ tr(g.t) }}</button>
          </div>
          <p class="lbl">{{ t.finder.type }}</p>
          <div class="types">
            <button v-for="ty in types" :key="ty.id" type="button" :class="{ on: f.type === ty.id }" @click="f.type = ty.id">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="ty.icon" /></svg>{{ tr(ty.t) }}
            </button>
          </div>
          <div class="two">
            <label><span>{{ t.finder.district }}</span>
              <select v-model="f.district"><option v-for="d in districts" :key="d.id" :value="d.id">{{ tr(d.t) }}</option></select>
            </label>
            <div v-if="hasRooms" class="rooms"><span>{{ t.finder.rooms }}</span>
              <div class="stepper"><button type="button" aria-label="-" @click="f.rooms = Math.max(1, f.rooms - 1)">−</button><b>{{ f.rooms }}{{ f.rooms >= 5 ? '+' : '' }}</b><button type="button" aria-label="+" @click="f.rooms = Math.min(5, f.rooms + 1)">+</button></div>
            </div>
          </div>
          <label v-if="showBudget" class="range"><span>{{ t.finder.budget }} <b>{{ budgetLabel }}</b></span>
            <input v-model.number="f.budget" type="range" min="15000" max="150000" step="5000" />
          </label>
          <div class="two">
            <label><span>{{ t.finder.name }}</span><input v-model="f.name" autocomplete="name" /></label>
            <label><span>{{ t.finder.phone }}</span><input v-model="f.phone" type="tel" dir="ltr" autocomplete="tel" /></label>
          </div>
          <p v-if="err" class="err" role="alert">{{ err }}</p>
          <button class="btn btn-navy block" type="submit">{{ t.finder.send }}</button>
        </form>
      </div>
    </section>

    <section class="section owners" id="owners">
      <div class="container">
        <div class="ow-head" v-reveal><div><p class="kicker">{{ t.owners.kicker }}</p><h2>{{ t.owners.title }}</h2></div><button type="button" class="btn btn-green" @click="setGoal('manage')">{{ t.owners.cta }}</button></div>
        <div class="ow-grid">
          <article v-for="(o, i) in t.owners.items" :key="o.t" class="ow" v-reveal><span class="n">0{{ i + 1 }}</span><h3>{{ o.t }}</h3><p>{{ o.d }}</p></article>
        </div>
      </div>
    </section>

    <section class="section process" id="process">
      <div class="container">
        <div class="head" v-reveal><p class="kicker">{{ t.process.kicker }}</p><h2>{{ t.process.title }}</h2></div>
        <ol class="road">
          <li v-for="(s, i) in t.process.steps" :key="s.t" v-reveal><span class="pin">{{ i + 1 }}</span><h3>{{ s.t }}</h3><p>{{ s.d }}</p></li>
        </ol>
        <form class="cb" novalidate @submit.prevent="callback" v-reveal>
          <div class="cb-txt"><h3>{{ t.callback.title }}</h3><p>{{ t.callback.lead }}</p></div>
          <div class="cb-fields">
            <select v-model="cb.slot" :aria-label="t.callback.slot"><option v-for="s in slots" :key="s.id" :value="s.id">{{ tr(s.t) }}</option></select>
            <input v-model="cb.name" :placeholder="t.finder.name" autocomplete="name" :aria-label="t.finder.name" />
            <input v-model="cb.phone" :placeholder="t.finder.phone" type="tel" dir="ltr" autocomplete="tel" :aria-label="t.finder.phone" />
            <button class="btn btn-green" type="submit">{{ t.callback.send }}</button>
          </div>
          <p v-if="cbErr" class="err" role="alert">{{ cbErr }}</p>
        </form>
      </div>
    </section>

    <section class="section reviews" id="reviews">
      <div class="container">
        <div class="head" v-reveal><p class="kicker">{{ t.reviews.kicker }}</p><h2>{{ t.reviews.title }}</h2></div>
        <div class="rv-grid">
          <blockquote v-for="r in reviews" :key="r.n" class="rv" :dir="r.ltr ? 'ltr' : 'rtl'" v-reveal><span class="q" aria-hidden="true">“</span><p>{{ r.q }}</p><footer>{{ r.n }} · ★★★★★</footer></blockquote>
        </div>
        <p class="note">{{ t.reviews.note }}</p>
      </div>
    </section>

    <section class="section visit" id="visit">
      <div class="container vs-in">
        <div class="vs-photo" v-reveal><img :src="img('building-night.jpg')" alt="" loading="lazy" /></div>
        <div class="vs-card" v-reveal>
          <p class="kicker">{{ t.visit.kicker }}</p>
          <h2>{{ t.visit.title }}</h2>
          <p class="addr">{{ t.visit.addr }}</p>
          <dl><div v-for="h in t.visit.hours" :key="h.d"><dt>{{ h.d }}</dt><dd>{{ h.h }}</dd></div></dl>
          <p class="lbl">{{ t.visit.more }}</p>
          <div class="nums">
            <a :href="`tel:${site.phone.tel}`" dir="ltr">{{ site.phone.label }}</a>
            <a v-for="p in site.signPhones" :key="p.tel" :href="`tel:${p.tel}`" dir="ltr">{{ p.label }}</a>
          </div>
          <a class="btn btn-navy" :href="site.maps" target="_blank" rel="noopener">{{ t.visit.dir }}</a>
        </div>
        <div class="map" v-reveal><iframe :src="site.mapEmbed" title="Map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container foot">
      <div class="logo light"><b>{{ t.brand }}</b><span>{{ t.brandSub }} {{ t.footer.also }}</span></div>
      <small>© {{ year }} {{ t.footer.rights }} · <em>{{ t.footer.demo }}</em></small>
    </div>
  </footer>
  <div class="sticky">
    <a :href="`tel:${site.phone.tel}`">{{ t.sticky.call }}</a>
    <a href="#find" class="main">{{ t.sticky.wa }}</a>
  </div>
</template>
