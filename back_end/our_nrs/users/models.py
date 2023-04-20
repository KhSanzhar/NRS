from django.db import models
from django.contrib.auth.models import User
#from PIL import Image


#Profile to make user changes, and image
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    #image = pillow

    def __str__(self):
        return f'{self.user.username} Profile'

    def save(self, *args, **kwargs):
        super(Profile, self).save(*args, **kwargs)

"""     img = Image.open(self.image.path)

        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.image.path)

    @property
    def get_image(self):
        return self.image.url if self.image else static('assets/img/team/default-profile-picture.png')
"""
