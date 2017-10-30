new Vue({
  el: '#events',

  data: {
    event: { title: '', detail: '', date: '' },
    events: []
  },

  ready: function () {
    this.fetchEvents();
  },

  methods: {

    fetchEvents: function () {
      var events = [];
      this.$http.get('/api/events')
        .success(function (events) {
          this.$set('events', events);
          console.log(events);
        })
        .error(function (err) {
          console.log(err);
        });
    },

    addEvent: function () {
      if (this.event.title.trim()) {
        this.$http.post('/api/events', this.event)
          .success(function (res) {
            this.events.push(this.event);
            console.log('Event added!');
          })
          .error(function (err) {
            console.log(err);
          });
      }
    },

    deleteEvent: function (index) {
      if (confirm('Are you sure you want to delete this event?')) {        
        this.$http.delete('api/events/' + event.id)
          .success(function (res) {
            console.log(res);
            this.events.splice(index, 1);
          })
          .error(function (err) {
            console.log(err);
          });
      }
    }
  }
});