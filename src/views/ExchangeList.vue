<template>
  <div style="width: 100%">
    <v-card>
      <v-subheader>
        <v-icon>mdi-magnify</v-icon>
        <span>검색조건</span>
        <v-btn icon @click="conditionShow = !conditionShow">
          <v-icon>{{ conditionShow ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-subheader>
      <v-expand-transition>
        <div v-show="conditionShow">
          <v-card-text>
            <v-form ref="form">
              <v-row>
                <v-col cols="12" sm="4" md="2">
                  <v-text-field label="이름" v-model="searchCondition.applicantName" outlined dense></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="2">
                  <v-text-field label="주문 번호" v-model="searchCondition.orderNumber" outlined dense></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="2">
                  <v-text-field label="예약 번호" v-model="searchCondition.pickupCode" outlined dense></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="4" md="2">
                  <v-select
                    v-model="searchCondition.partnerCode"
                    :items="partnerSelected"
                    label="파트너"
                    outlined
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4" md="2">
                  <v-select
                    v-model="searchCondition.termCurrencyCode"
                    :items="currencySelected"
                    label="환전 통화"
                    outlined
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4" md="2">
                  <v-select
                    v-model="searchCondition.exchangeStatusCode"
                    :items="exchangeStatusSelected"
                    label="환전 상태"
                    outlined
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4" md="2">
                  <v-select
                    v-model="searchCondition.receiptPlaceSeq"
                    :items="receiptPlaceSelected"
                    label="수령 장소"
                    outlined
                    dense
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="4" md="3">
                  <v-menu
                    ref="receiptDateMenu"
                    v-model="receiptDateMenu"
                    :close-on-content-click="false"
                    :return-value.sync="receiptDateRange"
                    transition="scale-transition"
                    offset-y
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="receiptDateRangeText"
                        label="환전액 수령일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="receiptDateRange"
                      no-title
                      scrollable
                      locale="ko-KR"
                      range
                      width="400"
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="receiptDateMenu = false">Cancel</v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.receiptDateMenu.save(receiptDateRange)"
                      >OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                  <v-menu
                    ref="receiptDueDateMenu"
                    v-model="receiptDueDateMenu"
                    :close-on-content-click="false"
                    :return-value.sync="receiptDueDateRange"
                    transition="scale-transition"
                    offset-y
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="receiptDueDateRangeText"
                        label="수령 예정일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="receiptDueDateRange"
                      no-title
                      scrollable
                      range
                      locale="ko-KR"
                      width="400"
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="receiptDueDateMenu = false">Cancel</v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.receiptDueDateMenu.save(receiptDueDateRange)"
                      >OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                  <v-menu
                    ref="exchangeRegDateMenu"
                    v-model="exchangeRegDateMenu"
                    :close-on-content-click="false"
                    :return-value.sync="exchangeRegDateRange"
                    transition="scale-transition"
                    offset-y
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="exchangeRegDateRangeText"
                        label="환전 신청일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="exchangeRegDateRange"
                      no-title
                      scrollable
                      range
                      locale="ko-KR"
                      width="400"
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="exchangeRegDateMenu = false">Cancel</v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.exchangeRegDateMenu.save(exchangeRegDateRange)"
                      >OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="indigo" @click="getList(true)">검색</v-btn>
            <v-btn text color="indigo" @click="reset">초기화</v-btn>
          </v-card-actions>
        </div>
      </v-expand-transition>
    </v-card>
    <br />
    <v-card>
      <v-card-title>
        <v-row>
          <v-col class="d-flex" cols="12" lg="4" sm="4">
            <v-subheader>검색결과 : {{ totalCount }}건</v-subheader>
          </v-col>
          <v-col class="d-flex" cols="12" lg="4" sm="4"></v-col>
          <v-col class="d-flex" cols="12" lg="2" sm="2">
            <v-select
              v-model="itemsPerPage"
              :items="pageSelected"
              label="검색 갯수"
              outlined
              dense
              @change="getList(true)"
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" lg="2" sm="2">
            <v-btn small color="deep-purple accent-4" dark @click="excelDown">엑셀파일 다운로드</v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="columns"
        :loading="loading"
        :items-per-page="itemsPerPage"
        class="elevation-1"
        loading-text="Loading... Please wait"
        hide-default-footer
      ></v-data-table>
      <div class="text-center pt-2">
        <v-row align="center">
          <v-pagination
            :total-visible="totalVisible"
            v-model="page"
            :length="pageCount"
            @input="getList(false)"
          ></v-pagination>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      searchCondition: {
        partnerCode: '',
        applicantName: '',
        orderNumber: '',
        pickupCode: '',
        receiptPlaceSeq: '',
        termCurrencyCode: '',
        exchangeStatusCode: ''
      },
      conditionShow: false,
      exchangeRegDateMenu: false,
      exchangeRegDateRange: [],
      receiptDueDateMenu: false,
      receiptDueDateRange: [],
      receiptDateMenu: false,
      receiptDateRange: [],
      partnerSelected: [],
      receiptPlaceSelected: [],
      currencySelected: [],
      exchangeStatusSelected: [],
      page: 1,
      pageCount: 0,
      totalCount: 0,
      itemsPerPage: 10,
      totalVisible: 10,
      pageSelected: [
        { text: '5개', value: 5 },
        { text: '10개', value: 10 },
        { text: '50개', value: 50 },
        { text: '100개', value: 100 },
        { text: '150개', value: 150 },
        { text: '200개', value: 200 }
      ],
      headers: [
        {
          text: '파트너코드',
          sortable: false,
          value: 'partnerCode',
          width: '5%',
          align: 'center'
        },
        {
          text: '환전 신청일',
          sortable: false,
          value: 'regDate',
          align: 'center'
        },
        {
          text: '이름',
          sortable: false,
          value: 'applicantName',
          width: '7%',
          align: 'center'
        },
        {
          text: '연락처',
          sortable: false,
          value: 'applicantPhoneNumber',
          align: 'center'
        },
        {
          text: '예약번호',
          sortable: false,
          value: 'pickupCode',
          align: 'center'
        },
        {
          text: '환전액',
          sortable: false,
          value: 'termAmount',
          align: 'center'
        },
        {
          text: '통화',
          sortable: false,
          value: 'termCurrencyCode',
          align: 'center'
        },
        {
          text: '입금여부',
          sortable: false,
          value: 'depositStatusCode',
          align: 'center'
        },
        {
          text: '입금액',
          sortable: false,
          value: 'depositAmount',
          align: 'center'
        },
        {
          text: '수령예정일',
          sortable: false,
          value: 'receiptDueDate',
          align: 'center'
        },
        {
          text: '수령일',
          sortable: false,
          value: 'receiptDate',
          align: 'center'
        },
        {
          text: '수령장소',
          sortable: false,
          value: 'receiptPlace',
          width: '10%',
          align: 'center'
        },
        {
          text: '유심',
          sortable: false,
          value: 'usim',
          align: 'center'
        },
        {
          text: '상태',
          sortable: false,
          value: 'exchangeStatusCode',
          align: 'center',
          width: '5%'
        }
      ],
      columns: [],
      loading: false
    }
  },
  created() {
    this.getList(true)
    this.getInitData()
  },
  methods: {
    async getList(reset) {
      if (reset) {
        this.page = 1
      }
      try {
        this.loading = true
        const {
          data: { requestList, totalCount }
        } = await axios.get(
          `${
            this.$store.getters.getServerUrl
          }/exchange/list?${this.getQueryString()}`
        )
        this.columns = requestList
        this.totalCount = totalCount
        this.pageCount = Math.ceil(this.totalCount / this.itemsPerPage)
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    async getInitData() {
      try {
        const {
          data: {
            partnerCodeList,
            termCurrencyCodeMap,
            receiptPlaceMap,
            exchangeStatusCodeList
          }
        } = await axios.get(
          `${this.$store.getters.getServerUrl}/exchange/init-condition`
        )
        partnerCodeList.forEach(n => {
          this.partnerSelected.push({ text: n, value: n })
        })
        exchangeStatusCodeList.forEach(n => {
          this.exchangeStatusSelected.push({ text: n.display, value: n.code })
        })
        for (let [code, name] of Object.entries(termCurrencyCodeMap)) {
          this.currencySelected.push({ text: name, value: code })
        }
        for (let [seq, name] of Object.entries(receiptPlaceMap)) {
          this.receiptPlaceSelected.push({ text: name, value: seq })
        }
      } catch (error) {
        console.log(error)
      }
    },
    getQueryString() {
      let queryString = `page=${this.page - 1}&size=${this.itemsPerPage}`
      for (let [key, value] of Object.entries(this.searchCondition)) {
        queryString += `&${key}=${value}`
      }

      let receiptDateArr = this.receiptDateRange
      if (receiptDateArr.length === 2) {
        receiptDateArr.sort()
        queryString += `&receiptDateStart=${receiptDateArr[0].concat(
          'T00:00:00'
        )}&receiptDateEnd=${receiptDateArr[1].concat('T23:59:59')}`
      }

      let receiptDueDateArr = this.receiptDueDateRange
      if (receiptDueDateArr.length === 2) {
        receiptDueDateArr.sort()
        queryString += `&receiptDueDateStart=${receiptDueDateArr[0]}&receiptDueDateEnd=${receiptDueDateArr[1]}`
      }

      let exchangeRegDateArr = this.exchangeRegDateArr
      if (exchangeRegDateArr.length === 2) {
        exchangeRegDateArr.sort()
        queryString += `&regDateStart=${exchangeRegDateArr[0].concat(
          'T00:00:00'
        )}&regDateEnd=${exchangeRegDateArr[1].concat('T23:59:59')}`
      }

      return queryString
    },
    excelDown() {},
    reset() {
      Object.keys(this.searchCondition).map(key => {
        this.searchCondition[key] = ''
      })
      this.receiptDueDateRange = []
      this.receiptDateRange = []
      this.exchangeRegDateRange = []
    }
  },
  computed: {
    receiptDateRangeText() {
      return this.receiptDateRange.join(' ~ ')
    },
    receiptDueDateRangeText() {
      return this.receiptDueDateRange.join(' ~ ')
    },
    exchangeRegDateRangeText() {
      return this.exchangeRegDateRange.join(' ~ ')
    }
  }
}
</script>
