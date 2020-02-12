@component('mail::message')
# Change password Request

Click on the button below to change password

@component('mail::button', ['url' => config('accountmail.frontend_url') . config('accountmail.response_password_reset_url') . $token, 'color' => 'success'])
Reset Password
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent