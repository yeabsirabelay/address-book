from rest_framework import serializers
from .models import Contact, SocialHandles

class SocialHandlesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialHandles
        fields = ['linkedin', 'facebook', 'twitter', 'instagram']

class ContactSerializer(serializers.ModelSerializer):
    social_handles = SocialHandlesSerializer()
    
    class Meta:
        model = Contact
        fields = ['id', 'full_name', 'email', 'mobile_phone', 'social_handles', 'created_at', 'updated_at']

    def create(self, validated_data):
        social_handles_data = validated_data.pop('social_handles')
        social_handles = SocialHandles.objects.create(**social_handles_data)
        contact = Contact.objects.create(social_handles=social_handles, **validated_data)
        return contact

    def update(self, instance, validated_data):
        social_handles_data = validated_data.pop('social_handles', None)
        
        # Update contact fields
        instance.full_name = validated_data.get('full_name', instance.full_name)
        instance.email = validated_data.get('email', instance.email)
        instance.mobile_phone = validated_data.get('mobile_phone', instance.mobile_phone)
        instance.save()
        
        # Update social handles if provided
        if social_handles_data:
            social_handles = instance.social_handles
            for attr, value in social_handles_data.items():
                setattr(social_handles, attr, value)
            social_handles.save()
        
        return instance