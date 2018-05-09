var myVue = new Vue({
    el: '#calendar',
    data: {
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        days: [],
    },
    created: function () { 
        this.initData(null);
    },
    methods: {
        initData: function (cur) {
            var leftcount = 0; 
            var date;
            if (cur) {
                date = new Date(cur);
            } else {
                var now = new Date();
                var d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1));
                d.setDate(35);
                date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
            }
            this.currentDay = date.getDate();
            this.currentYear = date.getFullYear();
            this.currentMonth = date.getMonth() + 1;

            this.currentWeek = date.getDay();
            if (this.currentWeek == 0) {
                this.currentWeek = 7;
            }
            var str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay);
            this.days.length = 0;
            for (var i = this.currentWeek - 1; i >= 0; i--) {
                var d = new Date(str);
                d.setDate(d.getDate() - i);
                var dayobject = {}; 
                dayobject.day = d;
                this.days.push(dayobject);
            }
            for (var i = 1; i <= 35 - this.currentWeek; i++) {
                var d = new Date(str);
                d.setDate(d.getDate() + i);
                var dayobject = {};
                dayobject.day = d;
                this.days.push(dayobject);
            }
        },
        pickPre: function (year, month) {
            var d = new Date(this.formatDate(year, month, 1));
            d.setDate(0);
            this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
        },
        pickNext: function (year, month) {
            var d = new Date(this.formatDate(year, month, 1));
            d.setDate(35);
            this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
        },
        pickYear: function (year, month) {
            alert(year + "," + month);
        },
        formatDate: function (year, month, day) {
            var y = year;
            var m = month;
            if (m < 10) m = "0" + m;
            var d = day;
            if (d < 10) d = "0" + d;
            return y + "-" + m + "-" + d
        },
    },
});