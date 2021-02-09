<template>
  <div class="home">
    <div
        class="pre-loader"
        v-if="isVisible"
    >
      <Preloader/>
    </div>
    <div class="header-wrapper">
      <div>По умолчанию выводятся заказы за текущий месяц.</div>
      <form class="wrapper-datepicker" @submit.prevent="getDataByDate($event)">
        <label for="data1">Показать заказы с</label>
        <input id="data1" type="text" class="datepicker">
        <label for="data2"> по</label>
        <input id="data2" type="text" class="datepicker">
        <button
            class="btn-small waves-effect waves-light"
            type="submit"
        >
          Загрузить
        </button>
      </form>
    </div>
    <tabs @clicked="tabClicked">
      <tab v-for="(i, index) in SHOPS"
            :key="index"
            :name="i"
      >
        <table>
          <thead>
          <tr>
            <th>Имя покупателя</th>
            <th>Наименование</th>
            <th>Дата продажи</th>
            <th>Номер отслеживания</th>
            <th>Статус отправления</th>
          </tr>
          </thead>

          <tbody @click="showMoreTitle($event)">
          <tr style="position: relative" v-for="(order, index) of DATA.orders" :key="index">
            <td>{{order.buyerName}}</td>
            <td class="more_info_title">
              {{normalizeTitle(order.title, order)}}
              <i :data-index="index" title="Смотреть полное название товара." class="material-icons">read_more</i>
            </td>
            <td>{{order.date.slice(0, 10)}}</td>
            <td :class="{'red-text': order.trackNumbers === null, 'text-blue': !!order.trackNumbers}">
              {{order.trackNumbers === null ? helperText : order.trackNumbers[0].number}}
            </td>
            <td>{{order.status}}</td>
          </tr>
          </tbody>
        </table>
      </tab>
    </tabs>
    <div class="helper-text-for-data" v-if="DATA === ''">Данные не загружены.</div>
    <div class="helper-text-for-data" v-if="isData">С {{ fromDate }}  по {{ toDate }}  заказы отсутствуют.</div>
  </div>
</template>

<script>
// @ is an alias to /src
import Preloader from '@/components/preloader'
import filter from "@/utils/filter";
import {dateFormat} from '@vuejs-community/vue-filter-date-format'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Home',
  components: {
    Preloader
  },
  data: () => ({
    fromDate: dateFormat(new Date()).split(' ')[0].split('-').slice(0, 2).join('-') + '-01',
    toDate: dateFormat(new Date()).split(' ')[0],
    nameShop: '',
    defaultShop: '',
    isDataOrders: false,
    regexp: /&#11088;/gi,
    isShowTitle: false,
    helperText: 'Трек номер отсутствует',
    isVisible: true,
    test: ''
  }),
  computed: {
    ...mapGetters(['SHOPS', 'DATA']),
    isData: function () {
      if (this.DATA !== '') {
        if(this.DATA.orders.length === 0) return true
      }
    }
  },
  methods: {
    ...mapActions(['main', 'GET_DATA']),
    showMoreTitle(event) {
      if(event.target.className !== 'more_info_title' && event.target.tagName !== 'I') return
      const index = event.target.childNodes[1] ? event.target.childNodes[1].dataset.index : event.target.dataset.index
      const item = this.DATA.orders[index]
      if(item.showFullText === 'true') {
        item.showFullText = 'false'
        this.$store.state.data.orders.splice(index, 1, item)
        event.target.style.position = ''
        event.target.style.backgroundColor = ''
      } else {
        item.showFullText = 'true'
        this.$store.state.data.orders.splice(index, 1, item)
        event.target.style.position = 'absolute'
        event.target.style.backgroundColor = 'white'
      }
    },
    normalizeTitle (str, order) {
      if(order.showFullText === 'true') {
        return str.replace(this.regexp, '')
      } else {
        return str.replace(this.regexp, '').slice(0, 26) + '...'
      }
    },
    async helperGetFunctionShopName() {
      await this.GET_DATA(filter(this.fromDate, this.toDate, this.nameShop || this.defaultShop))
    },
    active: function () {
      let el = document.querySelectorAll('[class="tabs-component-tab-a"]')[0]
      const event = new MouseEvent('click',)
      el.dispatchEvent(event)
    },
    getDataByDate (event) {
      this.isVisible = true
      this.fromDate = event.target.querySelector('input#data1').value.split(' ').join('-')
      this.toDate = event.target.querySelector('input#data2').value.split(' ').join('-')
      this.GET_DATA(filter(this.fromDate, this.toDate, this.nameShop || this.defaultShop))
          .then(() => this.isVisible = false)
    },
    tabClicked (selectedTab) {
      this.isVisible = true
      this.GET_DATA(filter(this.fromDate, this.toDate, selectedTab.tab.name || this.defaultShop))
          .then(() => this.isVisible = false)
    }
  },
  mounted() {
    this.main()
        .then(() => this.defaultShop = this.SHOPS[0])
        .then(() => this.helperGetFunctionShopName())
        .then(() => this.isVisible = false)
    setTimeout(()=> {
      this.active()
    }, 1000)
    const dataPickers = document.querySelectorAll('.datepicker');
    M.Datepicker.init(dataPickers, {
      showClearBtn: true,
      format: 'yyyy mm dd'
    })
  }
}
</script>
<style>
.text-blue {
  color: darkblue;
}
.helper-text-for-data {
  text-align: center;
  font-size: 16px;
  margin:  0 auto;
  padding: 2rem 3rem;
  background-color: darkblue;
  color: white;
}
table {
  font-size: 12px;
}
.more_info_title {
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 999;
}
.btn-small {
  height: 25px;
  line-height: 26px;
  font-size: 11px;
  padding: 0 7px;
  top: 0;
  right: 0;
  margin-top: -8px;
}
.header-wrapper, .wrapper-datepicker {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-wrapper {
  margin-top: 3px;
  padding: 1em 0.5em;
}

.wrapper-datepicker input {
  width: 100px !important;
  height: 2rem !important;
  font-size: 12px !important;
  text-align: center !important;
}
.app-content {
  padding-top: 0 !important;
}
.tabs-component {
  margin: 0;
}

.tabs-component-tabs {
  border: solid 1px #ddd;
  border-radius: 6px;
  margin-bottom: 5px;
}

@media (min-width: 700px) {
  .tabs-component-tabs {
    border: 0;
    align-items: stretch;
    display: flex;
    justify-content: flex-start;
    margin-bottom: -1px;
  }
}

.tabs-component-tab {
  color: #999;
  font-size: 14px;
  font-weight: 600;
  margin-right: 0;
  list-style: none;
}

.tabs-component-tab:not(:last-child) {
  border-bottom: dotted 1px #ddd;
}

.tabs-component-tab:hover {
  color: #666;
}

.tabs-component-tab.is-active {
  color: #000;
}

.tabs-component-tab.is-disabled * {
  color: #cdcdcd;
  cursor: not-allowed !important;
}

@media (min-width: 700px) {
  .tabs-component-tab {
    background-color: #fff;
    border: solid 1px #ddd;
    border-radius: 3px 3px 0 0;
    margin-right: .5em;
    transform: translateY(2px);
    transition: transform .3s ease;
  }

  .tabs-component-tab.is-active {
    border-bottom: solid 1px #fff;
    z-index: 2;
    transform: translateY(0);
  }
}

.tabs-component-tab-a {
  align-items: center;
  color: inherit;
  display: flex;
  padding: .50em 0.75em;
  text-decoration: none;
}

.tabs-component-panels {
  padding: 2em 0;
}

@media (min-width: 700px) {
  .tabs-component-panels {
    border-top-left-radius: 0;
    background-color: #fff;
    border: solid 1px #ddd;
    border-radius: 0 6px 6px 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .05);
    padding: 1em 0.5em;
  }
}
</style>
