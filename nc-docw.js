import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/iron-list/iron-list.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/theme/lumo/vaadin-grid.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';
import '@neogrup/nc-icons/nc-icons.js';
import '@polymer/iron-icons/device-icons.js';
import '@polymer/iron-icons/maps-icons.js';
import '@polymer/iron-icons/social-icons.js';
import '@polymer/iron-icons/hardware-icons.js';
import '@polymer/iron-icons/communication-icons.js';
import { AppLocalizeBehavior } from '@polymer/app-localize-behavior/app-localize-behavior.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { MixinDoc } from './nc-docw-behavior.js';
import '@neogrup/nc-doc/nc-doc.js';
import moment from 'moment/src/moment.js';

class NcDocW extends mixinBehaviors([AppLocalizeBehavior], MixinDoc(PolymerElement)) {
  static get template() {
    return html`
      <style>
        :host{
          @apply --layout-vertical;
          height: 100%;
          width: 100%;
          font-size: var(--nc-doc-font-size);
        }

        paper-tabs{
          --paper-tabs-selection-bar-color: var(--app-accent-color);
          background-color: var(--app-tabs-color);
          color: var(--app-primary-color);
          border-bottom: 1px solid #BDBDBD;
          margin-top: 0px;
          border-bottom: none;
          /*margin-bottom: 20px;*/ /*causes reduce margin and show scroll !*/
        }

        .line-dialog-actions {
          /* @apply --layout-horizontal; */
          /* @apply --layout-center; */
          /* @apply --layout-vertical; */
          width: 110px;
        }

        .lines-empty.tips{
          text-align: left;
          margin-top: 40px;
        }

        div.line-dialog-actions paper-icon-button{
          padding: 2px;
          margin: 5px
        }

        iron-icon {
          padding-right: 5px;
          margin: 0px;
          color: #9E9E9E;
          fill: #9E9E9E;
        }

        .info-ticket-container{
          width: 100%;
          height: 100%; 
        }

        iron-pages{
          height: calc(100% - 0px);
        }

        .content{
          /*padding: 0 10px;*/
          height: calc(100% - 50px);
          overflow: auto;
        }

        .row-center{
          @apply --layout-horizontal;
          @apply --layout-center;
          margin: 1px 0px 1px 0px;
        }

        .line-amount.credit-note{
          color: #D32F2F;
        } 

        .line-content-invoice{
          white-space: nowrap;
        }

        .line-container-invoice{
          background-color: rgba(238, 238, 238, 0.50);
          padding: 10px 0px;
          margin-top: 10px;
          border-right: 2px solid #9E9E9E;
        }

        .line-container-invoice-red{
          background-color: rgba(255, 235, 238, 0.5);
          padding: 10px 0px;
          margin-top: 10px;
          border-right: 2px solid #D32F2F;
          color: #D32F2F;
        }

        .line-content-invoice.sale{
          /* color: #262b65; */
        } 

        .line-content-invoice.credit-note{
          color: #D32F2F;
        } 

        .line-content-status{
          border-radius: 5px;
          padding: 2px 5px;
          font-weight: normal;
          width: 100px;
          color: white;
          text-align: center;
        }

        .line-content-status.opened{
          background-color: #388E3C;
        }

        .line-content-status.modifying{
          background-color: #388E3C;
        }

        .line-content-status.closed{
          background-color: #9E9E9E;
        }

        .line-content-status.closed-not-delivered{
          background-color: #9E9E9E;
        }

        .line-content-status.modified{
          background-color: #9E9E9E;
        }

        .line-content-status.credit-note{
          background-color: #D32F2F;
        }

        .line-content-edited{
          width: 60px;
        }

        .line-content-pending-amount{
          color: var(--error-color)
        }

        .line-content-pending-amount-payback{
          color: var(--success-color)
        }

        .line-content-customer-name {
        }
        
        .line-content-customer-tax-identification-code {
          
        }

        .line-content-customer-contact-email {
          color: #9E9E9E;
        }

        .line-content-customer-contact-tel {
          color: #9E9E9E;
        }

        .line-content-customer-postal-address-detail{
          color: #9E9E9E;
        }

        .line-content-customer-loyalty-card{
        }

        .line-content-customer-loyalty-account{
        }
      </style>
      
      <nc-icons></nc-icons>

      <div class="info-ticket-container" on-track="handleTrack" >
        <paper-tabs selected="{{selectedTab}}" scrollable align-bottom fit-container attr-for-selected="key">          
          <paper-tab key="ticket">{{localize('DOCW_TAB_TICKET')}}</paper-tab> 
          <paper-tab key="basic">{{localize('DOCW_TAB_BASIC')}}</paper-tab> 
          <template is="dom-if" if="{{showTicketInfoCustomer}}">
            <paper-tab key="customer">{{localize('DOCW_TAB_CUSTOMER')}}</paper-tab>
          </template>
          <template is="dom-if" if="{{showTicketInfoPayments}}">
            <paper-tab key="payments">{{localize('DOCW_TAB_PAYMENTS')}}</paper-tab>
          </template>
          <template is="dom-if" if="{{showTicketInfoLog)}}">
            <paper-tab key="log">{{localize('DOCW_TAB_HISTORY')}}</paper-tab>
          </template>
        </paper-tabs>
        <div class="content" on-track="handleTrack">
          <iron-pages selected="{{selectedTab}}" attr-for-selected="key">
            <div style="height: 100%;width: 100%;" key="ticket">
              <nc-doc
                  id="doc"
                  data="[[data]]"
                  language="{{language}}"
                  show-doc-header
                  show-doc-footer
                  show-doc-lines
                  show-line-delivery-order="[[showLineDeliveryOrder]]"
                  show-line-group-info="[[showLineGroupInfo]]"
                  show-line-production-status="[[showLineProductionStatus]]"
                  show-line-pack-mandatory="[[showLinePackMandatory]]"
                  show-packs-reduced="[[showPacksReduced]]"
                  show-amounts-including-taxes>
              </nc-doc>
            </div>

            <div key="basic">
              <div style="background-color: rgba(232, 245, 233, 0.51);padding: 10px 0px;border-right: 2px solid #388E3C;">
                <div class="row-center">
                  <div class="row-center" style="width: 60%">
                    <iron-icon icon="maps:store-mall-directory"></iron-icon>
                    <div>[[shopName]]</div>
                  </div>
                  <div class="row-center" style="width: 40%">
                    <iron-icon icon="icons:event"></iron-icon>
                    <div>[[_formatDate(data.data.date, language)]]</div>
                  </div>
                </div>
                <div class="row-center">
                  <div class="row-center" style="width: 60%">
                    <iron-icon icon="maps:place"></iron-icon>
                    <div>[[data.data.location.zoneName]] - [[data.data.location.spot]]</div>
                  </div>
                  <div class="row-center" style="width: 40%">
                    <iron-icon icon="maps:local-offer"></iron-icon>
                    [[data.data.tariff.name]]
                  </div>
                </div>
                <div class="row-center">
                  <div class="row-center" style="width: 60%">
                    <iron-icon icon="icons:description"></iron-icon>
                    <div style="font-weight: bolder;">[[data.data.order]]</div>
                    <div style="margin-left: 10px;">[[invoice]]</div>
                  </div>
                  <template is="dom-if" if="[[!hideIdOrderIcon]]">
                    <div class="row-center">
                      <div>
                        <iron-icon icon="nc-icons:hash"></iron-icon>  
                      </div>
                      <div style="font-weight: bolder;">[[idorder]]</div>
                    </div>
                  </template>
                </div>
                <div class$="[[classNameStatus]]" style="margin-top: 5px;">{{localize(statusExplain)}}</div>
              </div>

              <template is="dom-if" if="{{showRescueContainer}}">
                <div class$="[[classNameInvoiceContainer]]">
                  <div><b>{{localize('DOCW_CREDIT_NOTE_OF_TITLE')}}</b></div>
                  <div class="row-center">
                    <div class="row-center" style="width: 60%">
                      <iron-icon icon="maps:store-mall-directory"></iron-icon>
                      <div>[[rescueShop]]</div>
                    </div>
                    <div class="row-center">
                      <iron-icon icon="icons:event"></iron-icon>
                      <div>[[rescueDate]]</div>
                    </div>
                  </div>
                  <div class="row-center">
                    <iron-icon icon="icons:description"></iron-icon>
                    <div>[[rescueNumber]]</div>
                    <div style="font-weight: bolder;margin-left: 10px;">[[rescueInvoice]]</div>
                  </div>
                </div>
              </template>

              <div style="background-color: rgba(255, 248, 225, 0.5);padding: 10px 0px;margin-top: 10px;border-right: 2px solid #FFA000;">
                <div class="row-center">
                  <iron-icon icon="icons:query-builder"></iron-icon>
                  <div>
                    <div>
                      {{localize('DOCW_SYSDATA_CREATED_TITLE')}} <b>[[_formatDate(data.data.sysData.created, language, "H:mm")]]</b> {{localize('DOCW_SYSDATA_BY_NAME_TITLE')}} [[data.data.sysData.createdByName]] {{localize('DOCW_SYSDATA_OWNER_TITLE')}} [[data.data.owner]]
                    </div>
                    <div style="margin-top: 5px;">
                      {{localize('DOCW_SYSDATA_EDITED_TITLE')}} <b>[[_formatDate(data.data.sysData.edited, language, "H:mm")]]</b> {{localize('DOCW_SYSDATA_BY_NAME_TITLE')}} [[data.data.sysData.editedByName]]
                    </div>

                    <template is="dom-if" if="{{showPaymentDate}}">
                      <div style="margin-top: 5px;">
                        {{localize('DOCW_SYSDATA_CLOSED_TITLE')}} <b>[[_formatDate(data.data.fiscal.closedTime, language, "H:mm")]]</b> {{localize('DOCW_SYSDATA_BY_NAME_TITLE')}} [[data.data.sysData.editedByName]] {{localize('DOCW_SYSDATA_OWNER_TITLE')}} [[data.data.fiscal.owner]]
                      </div>
                    </template>
                  </div>
                </div>
                <template is="dom-if" if="{{showBooking}}">
                  <div class="row-center">
                    <iron-icon icon="icons:alarm"></iron-icon>
                    <div>
                      <div>{{localize('DOCW_SYSDATA_BOOKING_TITLE')}} <b>[[bookingDateTime]]</b></div>
                      <div style="color: #9E9E9E;">[[bookingBy]]</div>
                    </div>
                  </div>
                </template>
                <div class="row-center">
                  <iron-icon icon="icons:hourglass-empty"></iron-icon>
                  <div><b>[[elapsedTime]]</b></div>
                </div>
                <template is="dom-if" if="{{showComments}}">
                  <div class="row-center">
                    <iron-icon icon="speaker-notes"></iron-icon>
                    <div>[[data.data.comments.public]]</div>
                  </div>
                </template>
              </div>

              <div style="background-color: rgba(227, 242, 253, 0.51);padding: 10px 0px;margin-top: 10px;border-right: 2px solid #303F9F;">
                <div class="row-center">
                  <div class="row-center" style="width: 50%">
                    <iron-icon icon="social:group"></iron-icon>
                    <div><b>[[totalClients]]</b> {{localize('DOCW_STATS_CUSTOMERS_COUNT_TITLE')}}</div>
                  </div>
                  <div class="row-center" >
                    <iron-icon icon="maps:hotel"></iron-icon>
                    <div><b>[[room.value]]</b></div>
                  </div>
                </div>
                <div class="row-center">
                  <iron-icon icon="icons:print"></iron-icon>
                  <div><b>[[data.data.stats.printProformaCount]]</b> {{localize('DOCW_STATS_PRINTED_PROFORMA_COUNT_TITLE')}}</div>[[proformaPrintedTimes]]
                </div>
                <div class="row-center">
                  <iron-icon icon="icons:print"></iron-icon>
                  <div><b>[[data.data.stats.printInvoiceCount]]</b> {{localize('DOCW_STATS_PRINTED_INVOICE_COUNT_TITLE')}}</div>
                </div>
                <div class="row-center">
                  <div class="row-center" style="width: 50%">
                    <iron-icon icon="icons:view-headline"></iron-icon>
                    <div><b>[[data.data.stats.deliveredProducts]]</b> {{localize('DOCW_STATS_DELIVERED_PRODUCTS_COUNT_TITLE')}}</div>
                  </div>
                  <div class="row-center">
                    <iron-icon icon="icons:view-headline"></iron-icon>
                    <div><b>[[data.data.stats.soldProducts]]</b> {{localize('DOCW_STATS_SOOLD_PRODUCTS_COUNT_TITLE')}}</div>
                  </div>
                </div>
              </div>
            </div>

            <template is="dom-if" if="{{showTicketInfoCustomer}}">
              <div key="customer">

                <div style="background-color: rgba(232, 245, 233, 0.51);padding: 10px 0px;border-right: 2px solid #388E3C;">
                  <template is="dom-if" if="[[_lineHasValue(data.data.buyerParty.name)]]">
                    <div class="row-center">
                      <div>
                        <iron-icon icon="social:person"></iron-icon>  
                      </div>  
                      <div class="line-content-customer-name">[[data.data.buyerParty.name]]</div>
                    </div>
                  </template>
                  <template is="dom-if" if="[[_lineHasValue(data.data.buyerParty.taxIdentification.code)]]">
                    <div class="row-center">
                      <div>
                        <iron-icon icon="nc-icons:taxIdentification"></iron-icon>  
                      </div>
                      <div class="line-content-customer-tax-identification-code">[[data.data.buyerParty.taxIdentification.code]]</div>
                    </div>
                  </template>
                  <template is="dom-if" if="[[_lineHasValue(data.data.buyerParty.contact.email)]]">
                    <div class="row-center">
                      <div>
                        <iron-icon icon="mail"></iron-icon>  
                      </div>
                      <div class="line-content-customer-contact-email">[[data.data.buyerParty.contact.email]]</div>
                    </div>
                  </template>
                  <template is="dom-if" if="[[_lineHasValue(data.data.buyerParty.contact.tel)]]">
                    <div class="row-center">
                      <div>
                        <iron-icon icon="communication:phone"></iron-icon>  
                      </div>
                      <div class="line-content-customer-contact-tel">[[data.data.buyerParty.contact.tel]]</div>
                    </div>
                  </template>
                  <template is="dom-if" if="[[_lineHasValue(data.data.buyerParty.postalAddress.detail)]]">
                    <div class="row-center row-padding-vertical">
                      <div>
                        <iron-icon icon="maps:place"></iron-icon>  
                      </div>
                      <div class="line-content-customer-postal-address-detail">[[_getFullPostalAddressDetail(data.data.buyerParty.postalAddress)]]</div>
                    </div>
                  </template>
                </div>

                <template is="dom-if" if="{{showCustomerLoyalty}}">
                  <div style="background-color: rgba(227, 242, 253, 0.51);padding: 10px 0px;margin-top: 10px;border-right: 2px solid #303F9F;">
                    <template is="dom-if" if="[[_lineHasValue(data.data.buyerParty.loyalty.card)]]">
                      <div class="row-center">
                        <div>
                          <iron-icon icon="card-membership"></iron-icon>  
                        </div>
                        <div class="line-content-customer-contact-card">[[data.data.buyerParty.loyalty.card]]</div>
                      </div>
                    </template>
                    <template is="dom-if" if="[[_lineHasValue(data.data.buyerParty.loyalty.account)]]">
                      <div class="row-center">
                        <div>
                          <iron-icon icon="account-balance-wallet"></iron-icon>  
                        </div>
                        <div class="line-content-customer-loyalty-account">[[data.data.buyerParty.loyalty.account]]</div>
                      </div>
                    </template>
                  </div>
                </template>

              </div>
            </template>
            
            <template is="dom-if" if="{{showTicketInfoPayments}}">
              <div key="payments">
                <div style="background-color: rgba(232, 245, 233, 0.51);padding: 10px 0px;border-right: 2px solid #388E3C;">
                  <div class="row-center">
                    <iron-icon icon="nc-icons:wallet"></iron-icon>
                    <div>
                      <div class="row-center">
                        <div>{{localize('DOCW_PAYMENTS_TOTAL_AMOUNT_TITLE')}} <b>[[_formatPriceCur(data.data.fiscal.totals.totalAmount, data.data.fiscal.currency.symbol)]]</b> ([[data.data.fiscal.currency.code]])</div>
                        <div style="color: #9E9E9E; margin-left: 10px;">([[_formatPriceCur(data.data.fiscal.totals.netAmount, data.data.fiscal.currency.symbol)]] {{localize('DOCW_PAYMENTS_NET_AMOUNT_TITLE')}})</div>
                      </div>
                      <div style="margin-top: 5px;">
                        {{localize('DOCW_PAYMENTS_DELIVERED_AMOUNT_TITLE')}} <b>[[_formatPriceCur(data.data.fiscal.totals.deliveredAmount, data.data.fiscal.currency.symbol)]]</b>
                      </div>

                      <div style="margin-top: 5px;" class$="[[classNamePendingAmount]]">[[pendingAmountLabel]] <b>[[pendingAmountText]]</b></div>
                    </div>
                  </div>
                </div>
                <div style="background-color: rgba(227, 242, 253, 0.51);padding: 10px 0px;margin-top: 10px;border-right: 2px solid #303F9F;">
                  <div class="row-center">
                    <iron-icon icon="nc-icons:drawer"></iron-icon>
                    <div>{{localize('DOCW_PAYMENTS_DRAWER_AMOUNT_TITLE')}} [[data.data.fiscal.drawerName]]</div>
                  </div>
                </div>
                <div style="padding: 10px 0px;margin-top: 10px;margin-top: 10px;">
                  <vaadin-grid id="gridPayments" theme="compact" items="[[data.data.fiscal.paymentsSummary]]" height-by-rows>
                    <vaadin-grid-column flex-grow="1">
                        <template class="header">{{localize('DOCW_PAYMENTS_GRID_MEAN_NAME_TITLE')}}</template>
                        <template>[[item.meanName]]</template>
                    </vaadin-grid-column>
                    <vaadin-grid-column flex-grow="1" width="100px" hidden="{{!ticketPaymentShowTip}}">
                      <template class="header">
                        <div style="text-align: right;">{{localize('DOCW_PAYMENTS_GRID_TIP_AMOUNT_TITLE')}}</div>
                      </template>
                      <template>
                        <div style="text-align: right;">[[_formatPriceCur(item.tip, item.currencySymbol)]]</div>
                      </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column flex-grow="1" width="100px">
                      <template class="header">
                        <div style="text-align: right;">{{localize('DOCW_PAYMENTS_GRID_DELIVERED_AMOUNT_TITLE')}}</div>
                      </template>
                      <template>
                        <div style="text-align: right;">[[_formatPriceCur(item.in, item.currencySymbol)]]</div>
                      </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column flex-grow="1" width="100px">
                      <template class="header">
                        <div style="text-align: right;">{{localize('DOCW_PAYMENTS_GRID_CHANGE_AMOUNT_TITLE')}}</div>
                      </template>
                      <template>
                        <div style="text-align: right;">[[_getOutAmount(item)]]</div>
                      </template>
                    </vaadin-grid-column>
                  </vaadin-grid>
                </div>
              </div>
            </template>

            <template is="dom-if" if="{{showTicketInfoLog}}">
              <div key="log">
                <div>
                  <vaadin-grid id="gridLog" theme="compact" items="[[ticketLogFromListData.data]]" height-by-rows>
                    <vaadin-grid-column width="90px" flex-grow="0">
                      <template class="header">{{localize('DOCW_LOG_TIME_TITLE')}}</template>
                      <template>[[_formatTimeSec(item.time, language)]]</template>
                    </vaadin-grid-column>
                    <vaadin-grid-column flex-grow="1">
                      <template class="header">{{localize('DOCW_LOG_USER_TITLE')}}</template>
                      <template>[[item.userName]]</template>
                    </vaadin-grid-column>
                    <vaadin-grid-column width="80px" flex-grow="0">
                      <template class="header">{{localize('DOCW_LOG_TILL_TITLE')}}</template>
                      <template>[[item.till]]</template>
                    </vaadin-grid-column>
                    <vaadin-grid-column width="150px" flex-grow="0">
                      <template class="header">{{localize('DOCW_LOG_OPERATION_TITLE')}}</template>
                      <template>[[item.operation]]</template>
                    </vaadin-grid-column>
                    <vaadin-grid-column width="110px" flex-grow="0">
                      <template class="header">{{localize('DOCW_LOG_SUBCODE_TITLE')}}</template>
                      <template>[[item.subCode]]</template>
                    </vaadin-grid-column>
                    <vaadin-grid-column width="300px" flex-grow="0">
                      <template class="header">{{localize('DOCW_LOG_DETAIL_TITLE')}}</template>
                      <template>[[item.name]]</template>
                    </vaadin-grid-column>          
                    
                  </vaadin-grid>
                </div>
              </div>
            </template>
          </iron-pages>
        </div>
      </div>  
      
    `;
  }

  static get properties() {
    return {
      language: String,
      ticketLogFromListData: Object,

      data: {
        type: Object,
        observer: '_dataChanged',
      },
      // nc-doc fields
      showLineDeliveryOrder: {
        type: Boolean,
        value: false
      },
      showLineGroupInfo: {
        type: Boolean,
        value: false
      },
      showLineProductionStatus: {
        type: Boolean,
        value: false
      },
      showLinePackMandatory: {
        type: Boolean,
        value: false
      },
      showPacksReduced: {
        type: Boolean,
        value: false
      },
      //other
      showDocHeader: {
        type: Boolean,
        value: false
      },
      showDocLines: {
        type: Boolean,
        value: false
      },
      showDocFooter: {
        type: Boolean,
        value: false
      },
      lineActionsEnabled: {
        type: Boolean,
        value: false
      },
      hideLineActionsMultiLevel: {
        type: Boolean,
        value: false
      },
      showCanceledLines: {
        type: Boolean,
        value: false
      },
      showChangeInDialog: {
        type: Boolean,
        value: false
      },
      previewMode: {
        type: Boolean,
        value: false
      },
      showAmountsIncludingTaxes: {
        type: Boolean,
        value: false
      },
      // fields
      showTicketInfoCustomer: {
        type: Boolean,
        value: false,
        notify: true
      },
      showTicketInfoPayments: {
        type: Boolean,
        value: true
      },
      showTicketInfoLog: {
        type: Boolean,
        value: false,
        notify: true
      },
      showPacksReduced: {
        type: Boolean,
        value: false
      },
      hidePacksMultiLevel: {
        type: Boolean,
        value: false
      },
      hideChangeAndDeliveredAmount: {
        type: Boolean,
        value: false
      },

      selectedTab:{
        type: String, 
        value: "ticket"
      },
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.useKeyIfMissing = true;
    
    let path = import.meta.url.substr(0,import.meta.url.lastIndexOf('/'));

    this.loadResources(path+'/./static/translations.json');
  }

  handleTrack(e){
    switch(e.detail.state){
      case 'start':
        this.trackCompleted = false;
        break;

      case 'track':
        if ((e.detail.ddx > 15) && (!this.trackCompleted)){
          this.trackCompleted = true;
          this._changeTab('previous')
        }

        if ((e.detail.ddx < -15) && (!this.trackCompleted)){
          this.trackCompleted = true;
          this._changeTab('next')
        }
        break;
      case 'end':
        this.trackCompleted = false;
        break;
    }
  }

  _changeTab(movement){
    switch (this.selectedTab) {
      case 'ticket':
        if (movement === 'next'){
          this.selectedTab = "basic"
        }
        break;


      case 'basic':
        if (movement === 'next'){
          if (this.showTicketInfoCustomer) {
            this.selectedTab = 'customer';
          } else {
            if (this.showTicketInfoPayments) {
              this.selectedTab = 'payments';
            } else {
              if (this.showTicketInfoLog) {
                this.selectedTab = 'log';
              }
            }
            
          }
        } else {
          this.selectedTab = 'ticket';
        }
        break;
      
      case 'customer':
        if (movement === 'next'){
          if (this.showTicketInfoPayments) {
            this.selectedTab = 'payments';
          } else {
            if (this.showTicketInfoLog) {
              this.selectedTab = 'log';
            }
          }
        } else {
          this.selectedTab = 'basic';
        }
        break;

      case 'payments':
        if (movement === 'next'){
          if (this.showTicketInfoLog) {
            this.selectedTab = 'log';
          }
        } else{
          if (this.showTicketInfoCustomer) {
            this.selectedTab = 'customer';
          } else{
            this.selectedTab = 'basic';
          }
        }
        break;

      case 'log':
        if (movement === 'previous'){
          if (this.showTicketInfoPayments) {
            this.selectedTab = 'payments';
          } else {
            if (this.showTicketInfoCustomer) {
              this.selectedTab = 'customer';
            } else {
              this.selectedTab = 'basic';
            }
          }
        }

      default:
        break;
    }
  }

  _dataChanged(){
    if (typeof this.data == "undefined") {
      return;
    }

    if (this.data == null) {
      return;
    }

    // Calculate elpastedTime
    let compareDate;

    let createTime = new Date(this.data.data.sysData.created);

    if (this.data.data.status == "opened") {
      compareDate = new Date(moment(this.data.systemTime).utc(this.data.systemTime).format());
    } else {
      compareDate = new Date(this.data.data.fiscal.closedTime);
    }
    
    let resultTime = '';

    resultTime = (Math.floor((compareDate.getTime() - createTime.getTime()) / 1000 / 60)) + "'";
    resultTime = moment.utc(moment(compareDate, "HH:mm:ss").diff(moment(createTime, "HH:mm:ss"))).format("HH:mm:ss")
    
    this.elapsedTime = Math.trunc(moment.duration(resultTime).asMinutes()) + "'";

    this.shopName = (this.data.data.shopName !== "") ? this.data.data.shopName : this.data.data.shopCode;

    this.statusExplain = (this.data.data.statusExplain) ? this.data.data.statusExplain : "opened";

    this.showBooking = false;
    this.showComments = false;
    this.showPaymentDate = false;
    this.bookingDateTime = "";
    this.bookingBy = "";
    this.proformaPrintedTimes = "";
    this.invoice = "";
    this.hideIdOrderIcon = true;
    this.idorder = ""
    this.totalClients = 0;
    this.room = {value:""};
    this.showCustomerLoyalty = false;

    this.showRescueContainer = false;
    this.rescueShop = "";
    this.rescueDate = "";
    this.rescueNumber = "";
    this.rescueInvoice = "";


    this.classNameInvoiceContainer = 'line-container-invoice';
    this.classNameInvoice = 'line-content-invoice';
    this.classNameAmount = 'line-amount';
    this.classNameStatus = 'line-content-status';

    this.pendingAmount = 0;
    this.pendingAmountLabel = this.localize('DOCW_PAYMENTS_PENDING_TO_PAY_AMOUNT_TITLE');
    if (typeof this.data.data.fiscal.currency.symbol == "undefined" ) {
      this.data.data.fiscal.currency.symbol = "€";
    }
    this.pendingAmountText = "-,-- " + this.data.data.fiscal.currency.symbol;
    this.classNamePendingAmount = "line-content-pending-amount";
    
    if (this.data.data.comments){ 
      if (this.data.data.comments.public) this.showComments = true;
    }

    if (this.data.data.fiscal){ 
      if (this.data.data.fiscal.owner) this.showPaymentDate = true;
    }

    switch (this.statusExplain) {
      case "opened":
        this.classNameStatus = this.classNameStatus + " opened";
        break;
      case "modifying":
        this.classNameStatus = this.classNameStatus + " modifying";
        break;
      case "closed":
        this.classNameStatus = this.classNameStatus + " closed";
        break;
      case "closedNotDelivered":
        this.classNameStatus = this.classNameStatus + " closed-not-delivered";
        this.hideNotDeliveredIcon = false;
        break;
      case "modified":
        this.classNameStatus = this.classNameStatus + " modified";
        break;
      case "creditNote":
        this.classNameStatus = this.classNameStatus + " credit-note";
        this.classNameInvoiceContainer = 'line-container-invoice-red';
        break;
    }

    if (this.data.data.fiscal.documentSerie){
      this.showInvoice = true;

      let invoiceType = this.data.data.fiscal.documentSerie.substring(0, 2);
      switch (invoiceType) {
        case "FF":
          this.classNameInvoice = this.classNameInvoice + " credit-note";
          this.classNameAmount = this.classNameAmount + " credit-note";
          break;
        case "FR":
          this.classNameInvoice = this.classNameInvoice + " credit-note";
          this.classNameAmount = this.classNameAmount + " credit-note";
          break;
        case "FS":
          this.classNameInvoice = this.classNameInvoice + " sale";
          this.classNameAmount = this.classNameAmount + " sale";
          break;
        case "FT":
          this.classNameInvoice = this.classNameInvoice + " sale";
          this.classNameAmount = this.classNameAmount + " sale";
          break;
      }

      this.invoice = this.data.data.fiscal.documentSerie + ' / ' + this.data.data.fiscal.documentNumber;
    }

    if (this.data.data.properties){
      // Booking
      let deliveryTime = this.data.data.properties.find(property => property.name === "HEntrega");

      if (this.data.data.reserve){
        if (this.data.data.reserve.status == "reserved"){
          this.showBooking = true;
          this.bookingDateTime = this._formatDate(this.data.data.reserve.start, this.language, "D MMM H:mm");
          this.bookingBy = this.data.data.reserve.name;
        } else {
          this.showBooking = true;
          this.bookingDateTime = this._formatDate(this.data.data.reserve.start, this.language, "D MMM H:mm");
          this.bookingBy = this.data.data.reserve.name;
        }

      } else {
        if (deliveryTime) {
          this.showBooking = true;
          this.bookingDateTime =deliveryTime.value.substring(0,2) + ':' + deliveryTime.value.substring(2,4);
        }
      }

      // Proforma
      let proformaTime = this.data.data.properties.find(property => property.name === "ProformaImpresion");
      let proformaLastTime = this.data.data.properties.find(property => property.name === "ProformaImpresionLast");
      if (this.data.data.stats.printProformaCount !== 0){
        if (proformaLastTime) {
          this.proformaPrintedTimes = "(" + this._formatTime(proformaTime.value) + " - " + this._formatTime(proformaLastTime.value) + ")";
        } else {
          this.proformaPrintedTimes = "(" + this._formatTime(proformaTime.value) + ")";
        }
      }

      // Rescue
      let rescueShop = this.data.data.properties.find(property => property.name === "CentroAbonado");
      let rescueDate = this.data.data.properties.find(property => property.name === "JornadaAbonado");
      let rescueNumber = this.data.data.properties.find(property => property.name === "NumeroAbonado");
      let rescueInvoice = this.data.data.properties.find(property => property.name === "NumFactOriginal");

      let rescueShopEd = this.data.data.properties.find(property => property.name === "CentroAbonadoEd");
      let rescueDateEd = this.data.data.properties.find(property => property.name === "JornadaAbonadoEd");
      let rescueNumberEd = this.data.data.properties.find(property => property.name === "NumeroAbonadoEd");


      if (rescueShop) this.rescueShop = rescueShop.value;
      if (rescueDate) this.rescueDate = this._formatDate(rescueDate.value);
      if (rescueNumber) this.rescueNumber = rescueNumber.value;
      if (rescueInvoice) this.rescueInvoice = rescueInvoice.value;

      if (rescueShopEd) this.rescueShop = rescueShopEd.value;
      if (rescueDateEd) this.rescueDate = this._formatDate(rescueDateEd.value);
      if (rescueNumberEd) this.rescueNumber = rescueNumberEd.value;

      if ((this.rescueShop) || (this.rescueDate) || (this.rescueNumber) || (this.rescueInvoice)) this.showRescueContainer = true;

      let idorder = this.data.data.properties.find(property => property.name === "IDOrder");
      if (idorder){
        this.idorder = idorder.value;
        this.hideIdOrderIcon = false;
      }
    }

    if ((this.data.data.buyerParty.loyalty.card) || (this.data.data.buyerParty.loyalty.account)) this.showCustomerLoyalty = true;
    if (this.data.data.buyerParty.totalClients) this.totalClients = this.data.data.buyerParty.totalClients;
    
    this.room = this.data.data.properties.find(property => property.name === "Habitacion");
    if (!this.room) {
      this.room = {value:""};
    }

    // Payments
    if (this.data.data.fiscal.totals.pendingAmount) { 
      this.pendingAmount = this.data.data.fiscal.totals.pendingAmount;
      this.hideMeansGrid = false;
      this.hidePaybackGrid = true;
    }

    if (this._checkNumberIsZero(this.pendingAmount)) { 
      if (this.data.data.fiscal.totals.changeAmount){
        this.pendingAmount = this.data.data.fiscal.totals.changeAmount;
      }
      this.pendingAmountLabel = this.localize('DOCW_PAYMENTS_PENDING_PAYBACK_AMOUNT_TITLE');
      this.classNamePendingAmount += " line-content-pending-amount-payback";
    } else {
      if (this.pendingAmount < 0){
        this.pendingAmountLabel = this.localize('DOCW_PAYMENTS_PENDING_TO_PAYBACK_AMOUNT_TITLE');
        this.classNamePendingAmount += " line-content-pending-amount-payback";
      }
    }

    if (!this._checkNumberIsZero(this.pendingAmount)) { 
      this.pendingAmountText = this._formatPriceCur(Math.abs(this.pendingAmount), this.data.data.fiscal.currency.symbol);
    }

    // Detect if there are tips to show column
    if (this.data.data.fiscal.paymentsSummary) {
      this.ticketPaymentShowTip = this.data.data.fiscal.paymentsSummary.find(line =>
        line.idTip >= 0
      );
      if (typeof this.ticketPaymentShowTip == "undefined") {
        this.ticketPaymentShowTip = false;  
      }
    } else {
      this.ticketPaymentShowTip = false;
    }

    if (this.showTicketInfoLog){
      this._getLog();
    }
  }
  
  _getFullPostalAddressDetail(postalAddress){
    let fullPostalAddress;

    fullPostalAddress = postalAddress.detail;

    if (postalAddress.postalCode){
      fullPostalAddress = fullPostalAddress + " (" + postalAddress.postalCode;
      if (postalAddress.city){
        fullPostalAddress = fullPostalAddress + " - " + postalAddress.city + ")";
      } else {
        fullPostalAddress = fullPostalAddress + ")";
      }
    } else {
      if (postalAddress.city){
        fullPostalAddress = fullPostalAddress + " (" + postalAddress.city + ")";
      }
    }

    return fullPostalAddress;
  }

  _getCreditNoteNumber(creditNoteNumber){
    if (creditNoteNumber){
      return ' #' + creditNoteNumber;
    }
  }

  _getOutAmount(payment){
    if (typeof this.data.data.fiscal.currency.symbol == "undefined" ) {
      this.data.data.fiscal.currency.symbol = "€";
    }
    let outAmountText = "-,-- " + this.data.data.fiscal.currency.symbol;
    if (payment.out){
      if (payment.out != 0){
        outAmountText = this._formatPriceCur(payment.out, payment.currencySymbol);
      }
    }
    return outAmountText;
  }

  _getLog(){
    //this.$.getTicketLog.generateRequest();
    // TODO get log when clicked
  }
  
}
window.customElements.define('nc-docw', NcDocW);
