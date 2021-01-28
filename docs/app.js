/* global Vue */
const exp = {
  init: 2019,
  tInit: 2019,
  end: 'Today',
  title: 'Freelance Consultor',
  position: 'Front-end & Consulting',
  desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies odio eu molestie venenatis. Donec fermentum ex eu augue semper, sit amet mattis purus pretium.'
}
const Resume = {
  data: _ => ({
    theme: 'blueTheme',
    avatar: '/avatar.png',
    cards: [],
    pi: {
      changing: false,
      value: 'Personal Information'
    },
    name: {
      changing: false,
      value: 'Name'
    },
    nationality: {
      changing: false,
      value: 'Nationality'
    },
    fname: {
      changing: false,
      value: 'Fulanito Hernandez Gonzalez'
    },
    nat: {
      changing: false,
      value: 'Mexican'
    },
    desc: {
      changing: false,
      value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies odio eu molestie venenatis. Donec fermentum ex eu augue semper, sit amet mattis purus pretium. Vestibulum vel dui ex. Sed iaculis lectus risus, eget dignissim quam faucibus quis. Maecenas efficitur orci sit amet ex fermentum, ac semper risus fringilla. Quisque viverra dolor vel ex condimentum, eu dapibus dolor tincidunt. Donec eu rhoncus nunc. Donec elementum augue vehicula, lobortis justo aliquet, vulputate elit. Praesent rhoncus maximus consectetur. Nulla laoreet vitae ante et tincidunt.'
    },
    exp: {
      changing: false,
      value: 'Experience'
    },
    apn: {
      changing: false,
      value: 'Fulanito Hdz.'
    },
    app: {
      changing: false,
      value: 'Web Developer & UI Designer'
    },
    apo: {
      changing: false,
      value: 'Somewhere'
    },
    con: {
      changing: false,
      value: 'Contact'
    },
    tel: {
      changing: false,
      value: '+00 000 310 229'
    },
    mai: {
      changing: false,
      value: 'hello@mysite.com'
    },
    lin: {
      changing: false,
      value: 'www.linkeding.com/in/mybio'
    },
    git: {
      changing: false,
      value: 'www.github.com/myaccount'
    }
  }),
  methods: {
    addCard () {
      this.cards.push(
        Object.assign(
          JSON.parse(JSON.stringify(exp)),
          { key: new Date().getTime() }
        )
      )
      this.saveData()
    },
    toggleEditing (el, value = true) {
      this[el].changing = value
      if (!value) return this.saveData()
      setTimeout(() => {
        this.$refs[el].focus()
        this.$refs[el].select()
      }, 1)
    },
    parseTime (card) {
      return `${card.init} - ${card.end}`
    },
    saveCard (card) {
      card.init = card.tInit
      card.editing = false
      this.saveData()
    },
    deleteCard (card) {
      if (!confirm('Confirma eliminar elemento')) return
      this.cards = this.cards.filter(c => c.key !== card.key)
      this.saveData()
    },
    saveData () {
      localStorage.cvData = JSON.stringify(this.$data)
    },
    changeImage () {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', '.gif,.jpg,.jpeg,.png')
      input.click()
      input.addEventListener('change', () => {
        const file = input.files[0]
        const reader = new FileReader()
        reader.onload = e => {
          this.avatar = e.target.result
          this.saveData()
        }
        reader.readAsDataURL(file)
      })
    },
    toggleTheme () {
      this.theme = this.theme === 'blueTheme' ? 'purpleTheme' : 'blueTheme'
      this.saveData()
    }
  },
  computed: {
    orderedCards () {
      return this.cards.sort((a, b) => {
        if (a.init < b.init) return 1
        if (a.init > b.init) return -1
        return 0
      })
    }
  },
  mounted () {
    const prev = JSON.parse(localStorage.cvData || '{}')
    Object.assign(this.$data, prev)
  }
}

Vue.createApp(Resume).mount('#resume')
