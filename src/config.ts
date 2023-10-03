export const config = {
  streamr: {
    dataId: process.env.REACT_APP_STREAMR_DATA_STREAM_ID,
    summaryId: process.env.REACT_APP_STREAMR_SUMMARY_STREAM_ID,
    privateKey:
      process.env.REACT_APP_STREAMR_PRIMARY_KEY!,
  },
}
