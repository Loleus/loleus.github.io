let sc;
let yt;
let info;
let pt;
fetch("./components/modal/soundcloud/sc.html").then(stream => stream.text()).then(text => sc = text);
fetch("./components/modal/youtube/yt.html").then(stream => stream.text()).then(text => yt = text);
fetch("./components/modal/aboutMe/info.html").then(stream => stream.text()).then(text => info = text);
fetch("./components/modal/photo/pt.html").then(stream => stream.text()).then(text => pt = text);

export default class Modal extends HTMLElement {
  static get observedAttributes() { return ["visibility", "label-text", "id"]; }
  constructor() {
    super();
  }
  get labelText() {
    return this.getAttribute('label-text');
  }
  get index() {
    return this.getAttribute('id');
  }
  set labelText(value) {
    if (value) {
      this.setAttribute('label-text', value);
    }
  }
  get visibility() {
    return JSON.parse(this.getAttribute("visibility"));
  }
  set visibility(v) {
    this.setAttribute("visibility", JSON.stringify(v));
  }
  async connectedCallback() {
    this.textContent = this.labelText;
    this.addEventListener("click", (e) => {
      this.visibility = !this.visibility
      console.log(this.index)
      window.scrollTo(0, 0);
    });
    this.visibility = false
  }
  disconnectedCallback() { }
  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render(attrName, oldVal, newVal);
  }
  getHTML = (id) => {
    if (id == "about") {
      return `${info}`
    }
    if (id == "music") {
      return `${sc}`
    }
    if (id == "video") {
      return `${yt}`
    }
    if (id == "photo") {
      return `${pt}`
    }
  }
  getTemp(vis, id, text) {
    if (vis) {
      return `
        <section class="container">
          <article id="content" class="content">
            ${this.getHTML(id)}
          </article>
        </section>
        <button>${text}</button>
        `
    } else {
      return `
        <button>${text}</button>
        `
    }
  }
  render(prop, oldVal, newVal) {
    this.innerHTML = this.getTemp(this.visibility, this.index, this.labelText);
  }
}
