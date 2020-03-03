from django.urls import path
from rest_framework import routers
from .views import ComplaintViewSet, OpenCasesViewSet, ClosedCasesViewSet, TopComplaintTypeViewSet, ConstituentViewSet, UserViewSet

router = routers.DefaultRouter()
router.register(r'^$', ComplaintViewSet, base_name='complaints')
router.register(r'', ComplaintViewSet, base_name='complaint')
router.register(r'/openCases', OpenCasesViewSet, base_name='openCases')
router.register(r'/closedCases', ClosedCasesViewSet, base_name='closedCases')
router.register(r'/topComplaints', TopComplaintTypeViewSet, base_name='topComplaints')
router.register(r'/constituentComplaints', ConstituentViewSet, base_name='constituentComplaints')
router.register(r'/userInfo', UserViewSet, base_name='userInfo')
urlpatterns = [

]
urlpatterns += router.urls


# # My experimental code:
# router.register(r'^$', HomeViewSet, base_name='home'),
# router.register(r'^complaints/$', ComplaintViewSet, base_name='complaint'),
# router.register(r'openCases', OpenCasesViewSet, base_name='openCases'),
# router.register(r'closedCases', ClosedCasesViewSet, base_name='closedCases'),
# router.register(r'topComplaints', TopComplaintTypeViewSet, base_name='topComplaints'),

# urlpatterns = [
# ]
# urlpatterns += router.urls
