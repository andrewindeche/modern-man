from django import forms

class EmailMessageForm(forms.Form):
    subject = forms.CharField(max_length=100)
    body = forms.CharField(widget=forms.Textarea)