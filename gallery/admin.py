from django.contrib import admin

# Register your models here.
from .models import Publisher
from .models import Image
from .models import Post

class PublisherAdmin(admin.ModelAdmin):
    list_display = ('verbose_id', 'email', 'occupation', 'is_active', 'invited_by')
    search_fields = ('alias', 'name', 'email',)
    list_filter = ('is_active', 'gender', 'occupation')
    ordering = ('id',)

class ImageAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'filename')
    search_fields = ('title', 'author')
    ordering = ('id',)

class PostAdmin(admin.ModelAdmin):
    list_display = ('image', 'publisher')
    search_fields = ('pub_date', 'image')
    ordering = ('id',)

admin.site.register(Publisher, PublisherAdmin)
admin.site.register(Image, ImageAdmin)
admin.site.register(Post, PostAdmin)