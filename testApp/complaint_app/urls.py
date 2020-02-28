from django.urls import path
from rest_framework import routers
from .views import ComplaintViewSet, OpenCasesViewSet, ClosedCasesViewSet, TopComplaintTypeViewSet

router = routers.DefaultRouter()
router.register(r'^$', ComplaintViewSet, base_name='complaints')
router.register(r'', ComplaintViewSet, base_name='complaint')
router.register(r'/openCases', OpenCasesViewSet, base_name='openCases')
router.register(r'/closedCases', ClosedCasesViewSet, base_name='closedCases')
router.register(r'/topComplaints', TopComplaintTypeViewSet, base_name='topComplaints')
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
