from django.db import models
from django.utils.translation import gettext_lazy as _

class Questions(models.Model):
    QUESTION_TYPE = (
        ("general", _("General")),
        ("forensic", _("Forensic")),
        ("crypto", _("Cryptography")),
        ("web-expo", _("Web-Expo")),
        ("reverse", _("Reverse")),
    )
    id = models.AutoField(_("id"), primary_key=True)
    name = models.CharField(_("name"), max_length=50)
    desc = models.CharField(_("description"), max_length=500)
    attachments = models.CharField(_("attachments"), max_length=500)
    answer = models.CharField(_("answer"), max_length=200)
    type = models.CharField(
        _("question type"),
        max_length=20,
        choices=QUESTION_TYPE,
        default="general"
    )
    def __str__(self):
        return self.name
