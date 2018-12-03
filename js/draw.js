class Screen {
  constructor(name) {
    this.name = name;
    this.nest = document.querySelector(`body`);
    this.holder = this.nest.querySelector(`#main`);

    this.components = {
      get 'backArrow'() {
        return
      },
      get 'gameState'() {
      },
      get 'statistics'() {
      }
    };

    this.template = ``;
    this.needBackArrow = false;
    this.needGameState = false;
    this.needStatistics = true;
  }

  render(template) {
    const mainId = this.holder.id;

    this.holder.id = ``;
    template.id = mainId;

    this.nest.replaceChild(template, this.holder);

    this.holder = template;
  }

  set template(game) {return `
      <section class="game">
        <p class="game__task">${game.task}</p>
        <form class="game__content">
        ${this.components[`backArrow`]}
        ${this.components[`gameState`]}
        </form>
        ${this.components[`statistics`]}
      </section>
    `;
  }
}


const ScreenTemplate = {
  'intro': `
    <section class="intro">
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </section>
  `,


};
