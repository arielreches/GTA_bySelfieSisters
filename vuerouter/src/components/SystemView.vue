<template>
  <b-row>
    <b-col cols="12">
      <h2>
        {{system.systemName}} System Details
        <b-btn variant='primary' size='sm' @click.stop="back()">Back to Group</b-link>
      </h2>
      <b-jumbotron>
        <template slot="header">
          {{system.systemName}}
        </template>
        <template slot="lead">
          <hr class="my-4">
          <!-- <b-btn variant="success" @click.stop="addtoGroup(system._id)">Add to Group</b-btn> -->
          <b-form>
            <b-form-input v-model.trim="tag" type="text" placeholder="Add Tag...">
            </b-form-input>
            <b-btn @click.stop="addTag(tag)" class="addTagButton">Add Tag</b-btn>
          </b-form>
          <span class="attribute">Tags  (Click on a tag to remove it from this system!):</span><br>
           <b-button @click.stop="removeTag(item)" v-for="item in system.Tag" size="small" variant="outline-success" :key="item.id" class = "tagButton">
            {{item}}
          </b-button><br>
          <span class="attribute">Company Name:</span> {{system.companyName}}<br>
          <span class="attribute">System Model:</span> {{system.model}}<br>
          <span class="attribute">OS Version:</span> {{system.osVersion}}<br>
          <span class="attribute">Recommended OS Version:</span> {{system.recommended.osVersion}}<br>
          <span class="attribute">Common Provisional Groups (CPGs):</span> {{system.cpgCount}}<br>
          <span class="attribute">Country/Region of Origin:</span> {{system.location.region + '/' + system.location.country}}<br>
          <span class="attribute">Capacity Percentage (Raw Storage):</span> {{parseInt(system.capacity.total.freePct) + '%' + ' (' + parseInt(system.capacity.total.freeTiB) + ' TiB)'}}<br>
          <template v-if='system.writeServiceTimeMillis != null'>
            <span class="attribute">Write Service Time:</span> {{system.writeServiceTimeMillis}}
          </template>
          <span class="attribute">Updated:</span> {{system.updated}}<br>
          <span class="attribute">Count/Node Count Offline:</span> {{system.nodes.nodeCount + '/' + system.nodes.nodeCountOffline}}<br>
          <span class="attribute">Disc Count:</span> {{system.disks.total.diskCount}}<br>
          <span class="attribute">Disc Count Disk Normal:</span> {{system.disks.total.diskCountDiskNormal}}<br>
          <span class="attribute">Disc Count Degraded:</span> {{system.disks.total.diskCountDegraded}}<br>
          <span class="attribute">Disc Count Failed:</span> {{system.disks.total.diskCountFailed}}<br>
          <span class="attribute">Contract Start Date:</span> {{system.contractStartDate}}<br>
          <span class="attribute">Contract End Date:</span> {{system.contractEndDate}}<br>
          <span class="attribute">SP Version:</span> {{system.sp.spVersion}}<br>
          <span class="attribute">VV Count:</span> {{system.vvCount}}<br>
          <span class="attribute">TPVV Count:</span> {{system.tpvvCount}}<br>
          <span class="attribute">VV Count Full:</span> {{system.vvCountFull}}<br>
          <span class="attribute">TDVV Size TB:</span> {{system.tdvvSizeTB}}<br>
          <span class="attribute">Bandwidth (KB/s):</span> {{system.performance.portBandwidthData.total.dataRateKBPSAvg}}<br>
          <span class="attribute">Total Service Time (Millis):</span> {{system.performance.summary.portInfo.totalServiceTimeMillis}}<br>
          <span class="attribute">Read Service Time (Millis):</span> {{system.performance.summary.portInfo.readServiceTimeMillis}}<br>
          <span class="attribute">Write Service Time (Millis):</span> {{system.performance.summary.portInfo.writeServiceMillis}}<br>
          <span class="attribute">Del Ack Percent:</span> {{system.delAckPct}}<br>
          <span class="attribute">Read Bandwidth (MB/s):</span> {{system.performance.summary.vvInfo.vvsByType.ssd.readBandwidthMBPS}}<br>
          <span class="attribute">Write Bandwidth (MB/s):</span> {{system.performance.summary.vvInfo.vvsByType.ssd.writeBandwidthMBPS}}<br>
        </template>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<style>
  .attribute {
    font-weight: bold;
  }
  .tagButton {
    margin-right: 2px;
  }
  .addTagButton {
    margin-top: 5px;
    margin-bottom: 20px;
    cursor:pointer;
  }
</style>

<script>
import axios from 'axios'

var system = {}

export default {
  name: 'SystemView',
  data () {
    return {
      id:'',
      system: system,
      tags: system.Tag,
      tag: ''
    }
  },
  created () {

    this.id=this.$route.params.groupid
    console.log(this.id)

    axios.get(`/system/` + this.$route.params.id)
    .then(response => {
      this.system = response.data
      console.log("made it")
      console.log(this.system)
    })
    .catch(e => {
      console.log(e)
    })
  },
  methods: {
    addTag (tag) {
      if (tag == '' || this.system.Tag.indexOf(tag) !== -1) {
        this.tag = '' 
        alert("Empty tag or it already exists!"
        )}
      else {
      this.system.Tag.push(tag)
      this.system.Tag = this.system.Tag.filter(function(n){ return n != ""})
      this.system.Tag = Array.from(new Set(this.system.Tag))
      console.log(this.system._id)
      axios.put('/system/' + this.system._id, this.system)
      this.tag = ''
      }
      
    },
    removeTag (remove) {
      //this.system.Tag = array.splice(this.system.Tag.indexOf(remove, 1))
      console.log(remove)
      this.system.Tag = this.system.Tag.filter(function(n){ return n != remove})
      axios.put('/system/' + this.system._id, this.system)
    },


    back(){
      this.$router.push({
        name: 'SystemList',
        params: { id: this.id }
      })
    }
  }
}
</script>
