/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/runtime', 'N/url', 'N/search'],

    // Add the callback function

    function(record, runtime, url, search) {

        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type
         * @param {Form} scriptContext.form - Current form
         * @Since 2015.2
         */
        function beforeLoad_addButton(scriptContext) {

            try //
            {
                var objRecord = scriptContext.newRecord;
                var recordType = objRecord.type;
                log.debug({
                    title: 'recordType',
                    details: recordType
                });
                var rec_id = objRecord.id;

                if(runtime.executionContext == runtime.ContextType.USER_INTERFACE) {
                    if(scriptContext.type == scriptContext.UserEventType.VIEW) {
                        var i_payment_mode = objRecord.getValue({
                            fieldId: 'custbody_sankara_payment_mode'
                        })
                        var status = objRecord.getValue({
                            fieldId: 'status'
                        })
                        log.debug('status', status)
                        log.debug('i_payment_mode', i_payment_mode)
                        var i_file_process = objRecord.getValue({
                            fieldId: 'custbody_seh_hold_payment_done_'
                        })
                        if(status == 'B' && i_payment_mode == 2 && (i_file_process == false || i_file_process == 'false' || i_file_process == 'FALSE')) {


                            output = url.resolveScript({
                                scriptId: 'customscript_sk_su_process_pymt_file',
                                deploymentId: 'customdeploy_sk_su_process_pymt_file',
                                returnExternalUrl: false
                            });

                            if(recordType == 'vendorprepayment') {
                                output += '&VENDORPREPAYMENT=' + rec_id
                            }
                            /* else if(recordType == 'transferorder')
                             {
                               output += '&TRANSFERORDID='+rec_id+'&TOLOCATION='+toLocation;
                             }*/
                            log.debug({
                                title: 'beforeLoad',
                                details: 'output' + output
                            });

                            scriptContext.form.addButton({
                                id: 'custpage_procress_payment',
                                label: 'Process To AXIS',
                                functionName: "javascript: meddwin=window.open('" + output + "','height=600,width=1000'); meddwin.focus();"

                            });
                            log.debug({
                                title: 'beforeLoad',
                                details: 'Before Load ends'
                            });


                        }

                    }
                    if(scriptContext.type == scriptContext.UserEventType.EDIT) {
                        objRecord.setValue({
                            fieldId: 'custbody_seh_payment_status_',
                            value: 1
                        })
                    }
                }

            } catch (e) {
                var errString = 'beforeLoad_addButton ' + e.name + ' : ' + e.type + ' : ' + e.message;
                log.error({
                    title: 'beforeLoad_addButton',
                    details: errString
                });
            }

        }

        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type
         * @Since 2015.2
         */
        function beforeSubmit(scriptContext) {
            var objRecord = scriptContext.newRecord;
            if(scriptContext.type == scriptContext.UserEventType.CREATE) {
                objRecord.setValue({
                    fieldId: 'custbody_seh_payment_status_',
                    value: 1
                })
            }
        }

        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type
         * @Since 2015.2
         */
        function afterSubmit(scriptContext) {
            var objRecord = scriptContext.newRecord;
            var recordType = objRecord.type;
            log.debug({
                title: ' after submit recordType',
                details: recordType
            });
            var rec_id = objRecord.id;
			var recordObj=record.load({type:recordType,id:rec_id,isDyanmic:true})
            var isUtrNo = recordObj.getValue({
                fieldId: 'custbody_seh_utr_no_'
            })
			log.debug('isUtrNo',isUtrNo)
			var isFile = recordObj.getValue({
                fieldId: 'custbody_seh_hold_payment_done_'
            })
			var paymentMode = recordObj.getValue({
                fieldId: 'custbody_sankara_payment_mode'
            })
			log.audit('paymentMode',paymentMode)
			log.debug('isFile',isFile)
            try {
                if(_logValidation(isUtrNo) && isFile==true && paymentMode==2) {
                    if(_logValidation(rec_id)) {
                        var id_ = record.submitFields({
                            type: record.Type.VENDOR_PREPAYMENT,
                            id: rec_id,
                            values: {
                                custbody_seh_payment_status_: 3
                            },
                            options: {
                                enableSourcing: false,
                                ignoreMandatoryFields: true
                            }
                        });
						log.debug('status changed as per status',id_)
                    }
                }
				
				
			if(isFile==true && _logValidation(rec_id) &&!_logValidation(isUtrNo) && paymentMode==2){
				var id = record.submitFields({
                            type: record.Type.VENDOR_PREPAYMENT,
                            id: rec_id,
                            values: {
                                custbody_seh_payment_status_: 2
                            },
                            options: {
                                enableSourcing: false,
                                ignoreMandatoryFields: true
                            }
                        });
						log.debug('file created',id)
			}
			var status = recordObj.getValue({
                            fieldId: 'status'
                        })
						log.audit('status',status)
			if(paymentMode!=2 && status=='B'){
				var idd = record.submitFields({
                            type: record.Type.VENDOR_PREPAYMENT,
                            id: rec_id,
                            values: {
                                custbody_seh_payment_status_: 3
                            },
                            options: {
                                enableSourcing: false,
                                ignoreMandatoryFields: true
                            }
                        });
						log.debug('aprt form neft',idd)
			}
            } catch (e) {
                log.error('error in after submit function', e.message)
            }


        }
		function _logValidation(value) {
            if (value != 'null' && value != null && value != null && value != '' && value != undefined && value != undefined && value != 'undefined' && value != 'undefined' && value != 'NaN' && value != NaN && value != 'Infinity') {
                return true;
            } else {
                return false;
            }
        }

        return {
            beforeLoad: beforeLoad_addButton,
            beforeSubmit: beforeSubmit,
            afterSubmit: afterSubmit
        };

    });