import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'app-user',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantCustomerAppUser.home.title' },
        loadChildren: () => import('./eRestaurantCustomer/app-user/app-user.module').then(m => m.ERestaurantCustomerAppUserModule),
      },
      {
        path: 'admin',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantAdminAdmin.home.title' },
        loadChildren: () => import('./eRestaurantAdmin/admin/admin.module').then(m => m.ERestaurantAdminAdminModule),
      },
      {
        path: 'restaurant',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantRestaurantRestaurant.home.title' },
        loadChildren: () =>
          import('./eRestaurantRestaurant/restaurant/restaurant.module').then(m => m.ERestaurantRestaurantRestaurantModule),
      },
      {
        path: 'customer',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantCustomerCustomer.home.title' },
        loadChildren: () => import('./eRestaurantCustomer/customer/customer.module').then(m => m.ERestaurantCustomerCustomerModule),
      },
      {
        path: 'customer-profile',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantCustomerCustomerProfile.home.title' },
        loadChildren: () =>
          import('./eRestaurantCustomer/customer-profile/customer-profile.module').then(m => m.ERestaurantCustomerCustomerProfileModule),
      },
      {
        path: 'products',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantCustomerProducts.home.title' },
        loadChildren: () => import('./eRestaurantCustomer/products/products.module').then(m => m.ERestaurantCustomerProductsModule),
      },
      {
        path: 'discount',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantRestaurantDiscount.home.title' },
        loadChildren: () => import('./eRestaurantRestaurant/discount/discount.module').then(m => m.ERestaurantRestaurantDiscountModule),
      },
      {
        path: 'app-discount',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantAdminAppDiscount.home.title' },
        loadChildren: () => import('./eRestaurantAdmin/app-discount/app-discount.module').then(m => m.ERestaurantAdminAppDiscountModule),
      },
      {
        path: 'restaurant-discount',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantRestaurantRestaurantDiscount.home.title' },
        loadChildren: () =>
          import('./eRestaurantRestaurant/restaurant-discount/restaurant-discount.module').then(
            m => m.ERestaurantRestaurantRestaurantDiscountModule
          ),
      },
      {
        path: 'categories',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantCustomerCategories.home.title' },
        loadChildren: () => import('./eRestaurantCustomer/categories/categories.module').then(m => m.ERestaurantCustomerCategoriesModule),
      },
      {
        path: 'cart',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantCustomerCart.home.title' },
        loadChildren: () => import('./eRestaurantCustomer/cart/cart.module').then(m => m.ERestaurantCustomerCartModule),
      },
      {
        path: 'order',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantCustomerOrder.home.title' },
        loadChildren: () => import('./eRestaurantCustomer/order/order.module').then(m => m.ERestaurantCustomerOrderModule),
      },
      {
        path: 'payment',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantCustomerPayment.home.title' },
        loadChildren: () => import('./eRestaurantCustomer/payment/payment.module').then(m => m.ERestaurantCustomerPaymentModule),
      },
      {
        path: 'ad',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantRestaurantAd.home.title' },
        loadChildren: () => import('./eRestaurantRestaurant/ad/ad.module').then(m => m.ERestaurantRestaurantAdModule),
      },
      {
        path: 'restaurant-ad',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantRestaurantRestaurantAd.home.title' },
        loadChildren: () =>
          import('./eRestaurantRestaurant/restaurant-ad/restaurant-ad.module').then(m => m.ERestaurantRestaurantRestaurantAdModule),
      },
      {
        path: 'notification',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantRestaurantNotification.home.title' },
        loadChildren: () =>
          import('./eRestaurantRestaurant/notification/notification.module').then(m => m.ERestaurantRestaurantNotificationModule),
      },
      {
        path: 'notification-type',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantRestaurantNotificationType.home.title' },
        loadChildren: () =>
          import('./eRestaurantRestaurant/notification-type/notification-type.module').then(
            m => m.ERestaurantRestaurantNotificationTypeModule
          ),
      },
      {
        path: 'employee',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantRestaurantEmployee.home.title' },
        loadChildren: () => import('./eRestaurantRestaurant/employee/employee.module').then(m => m.ERestaurantRestaurantEmployeeModule),
      },
      {
        path: 'role',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantAdminRole.home.title' },
        loadChildren: () => import('./eRestaurantAdmin/role/role.module').then(m => m.ERestaurantAdminRoleModule),
      },
      {
        path: 'permission',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantAdminPermission.home.title' },
        loadChildren: () => import('./eRestaurantAdmin/permission/permission.module').then(m => m.ERestaurantAdminPermissionModule),
      },
      {
        path: 'simple-permission',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantAdminSimplePermission.home.title' },
        loadChildren: () =>
          import('./eRestaurantAdmin/simple-permission/simple-permission.module').then(m => m.ERestaurantAdminSimplePermissionModule),
      },
      {
        path: 'composite-permission',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantAdminCompositePermission.home.title' },
        loadChildren: () =>
          import('./eRestaurantAdmin/composite-permission/composite-permission.module').then(
            m => m.ERestaurantAdminCompositePermissionModule
          ),
      },
      {
        path: 'state',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantCustomerState.home.title' },
        loadChildren: () => import('./eRestaurantCustomer/state/state.module').then(m => m.ERestaurantCustomerStateModule),
      },
      {
        path: 'new-order',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantCustomerNewOrder.home.title' },
        loadChildren: () => import('./eRestaurantCustomer/new-order/new-order.module').then(m => m.ERestaurantCustomerNewOrderModule),
      },
      {
        path: 'cancel',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantCustomerCancel.home.title' },
        loadChildren: () => import('./eRestaurantCustomer/cancel/cancel.module').then(m => m.ERestaurantCustomerCancelModule),
      },
      {
        path: 'complete',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantCustomerComplete.home.title' },
        loadChildren: () => import('./eRestaurantCustomer/complete/complete.module').then(m => m.ERestaurantCustomerCompleteModule),
      },
      {
        path: 'refunded',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantCustomerRefunded.home.title' },
        loadChildren: () => import('./eRestaurantCustomer/refunded/refunded.module').then(m => m.ERestaurantCustomerRefundedModule),
      },
      {
        path: 'on-hold',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantCustomerOnHold.home.title' },
        loadChildren: () => import('./eRestaurantCustomer/on-hold/on-hold.module').then(m => m.ERestaurantCustomerOnHoldModule),
      },
      {
        path: 'close',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantCustomerClose.home.title' },
        loadChildren: () => import('./eRestaurantCustomer/close/close.module').then(m => m.ERestaurantCustomerCloseModule),
      },
      {
        path: 'app-ad',
        data: { pageTitle: 'eRestaurantGatewayApp.appAd.home.title' },
        loadChildren: () => import('./app-ad/app-ad.module').then(m => m.AppAdModule),
      },
      {
        path: 'order-type',
        data: { pageTitle: 'eRestaurantGatewayApp.orderType.home.title' },
        loadChildren: () => import('./order-type/order-type.module').then(m => m.OrderTypeModule),
      },
      {
        path: 'profile',
        data: { pageTitle: 'eRestaurantGatewayApp.profile.home.title' },
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
