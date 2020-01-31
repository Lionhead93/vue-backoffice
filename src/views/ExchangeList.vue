<template>
  <v-data-table
    :headers="headers"
    :items="resData"
    :loading="loading"
    dense
    disable-pagination
    disable-filtering
    class="elevation-1"
    loading-text="Loading... Please wait"
  ></v-data-table>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      headers: [
        { text: '파트너코드', sortable: false, value: 'partnerCode' },
        { text: '환전 신청일', sortable: false, value: 'regDate' },
        { text: '이름', sortable: false, value: 'applicantName' },
        { text: '연락처', sortable: false, value: 'applicantPhoneNumber' },
        { text: '예약번호', sortable: false, value: 'orderNumber' },
        { text: '환전액', sortable: false, value: 'depositAmount' },
        { text: '통화', sortable: false, value: 'baseCurrencyCode' },
        { text: '입금여부', sortable: false, value: 'depositStatusCode' },
        { text: '입금액', sortable: false, value: 'depositAmount' },
        { text: '수령예정일', sortable: false, value: 'receiptDueDate' },
        { text: '수령일', sortable: false, value: 'receiptDate' },
        { text: '수령장소', sortable: false, value: 'receiptPlaceSeq' },
        { text: '유심', sortable: false, value: 'usimSeq' },
        { text: '상태', sortable: false, value: 'exchangeStatusCode' }
      ],
      resData: [],
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      axios({
        method: 'get',
        url: 'http://localhost:9092/exchange/list'
      }).then(res => {
        console.log(res)
        this.resData = res.data
      })
    }
  }
}
</script>
