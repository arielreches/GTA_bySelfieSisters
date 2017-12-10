//MongoDB System schema for storing in Database

var mongoose = require('mongoose');

var SystemSchema = new mongoose.Schema({
  companyName: String,
  systemName: String,
  serialNumber: String,
  productFamily: String,
  model: String,
  osVersion: String,
  patches: String,
  cpgCount: String,
  recommended: {
    osVersion: String,
  },
  location: {
    region: String,
    country: String,
  },
  installDate: String,
  updated: String,
  capacity: {
    total: {
      freePct: String,
      freeTiB: String,
      dedupeRatio: String,
    }
  },
  nodes: {
    nodeCount: String,
    nodeCountOffline: String,
    cpuAvgMax: String
  },
  disks: {
    total: {
      diskCount: String,
      diskCountDiskNormal: String,
      diskCountDegraded: String,
      diskCountFailed: String
    }
  },
  contractStartDate: String,
  contractEndDate: String,
  batteryExpiry: String,
  sp: {
    spVersion: String,
  },
  vvCount: String,
  tpvvCount: String,
  vvCountFull: String,
  tdvvSizeTB: String,
  performance: {
    portBandwidthData: {
      total: {
        dataRateKBPSAvg: String,
        iopsAvg: String,
        iopsMax: String,
      }
    },
    summary: {
      portInfo: {
        totalServiceTimeMillis: String,
        readServiceTimeMillis: String,
        writeServiceMillis: String,
      },
      delAckPct: String,
      vvInfo: {
        vvsByType: {
          ssd: {
            readBandwidthMBPS: String,
            writeBandwidthMBPS: String,
            readServiceTimeMillis: String,
            writeServiceTimeMillis: String
          }
        }
      }
    }
  },
  dataRateKBPSAvg: String,
  iopsAvg: String,
  iopsMax: String,
  totalServiceTimeMillis: String,
  readServicTimeMillis: String,
  writeServiceTimeMillis: String,
  delAckPct: String,
  ssdReadBandwidthMBPS: String,
  ssdWriteBandwidthMBPS: String,
  ssdReadservicewidthMBPS: String,
  ssdWriteServiceTimeMillis: String,
  cpuAvgMax: String,
  Tag: String, //will be updated
  Group: [{type: Schema.ObjectId, ref: 'Group'}],
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('System', SystemSchema);