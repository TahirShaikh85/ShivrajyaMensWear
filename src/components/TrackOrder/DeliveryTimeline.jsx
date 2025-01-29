import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  Typography,
  TimelineHeader,
} from "@material-tailwind/react";
import { AttentionSeeker, Fade } from "react-awesome-reveal";
import { selectTrackedOrderData, selectTrackedOrderError, trackedOrderData, trackedOrderError } from "../../Features/trackOrder/trackOrderSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AdjustmentsVerticalIcon, ArchiveBoxIcon, ArrowPathRoundedSquareIcon, CheckBadgeIcon, TruckIcon, XCircleIcon } from "@heroicons/react/24/outline";


export default function DeliveryTimeline() {

  const trackedOrderFailed = useSelector(selectTrackedOrderError);
  const trackedOrderSuccess = useSelector(selectTrackedOrderData);

  const readable_date_object = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
  const formatdate_createdAt = new Date(trackedOrderSuccess?.createdAt).toLocaleString('en-US', readable_date_object);
  const formatdate_updatedAt = new Date(trackedOrderSuccess?.updatedAt).toLocaleString('en-US', readable_date_object);


  // **** render **
  const renderTimelineItem = (text, level, statusIcon, color) => (
    <TimelineItem className="h-28">
      {
        level === 5 || level === 0 ? '' : <TimelineConnector className="!w-[78px]" />
      }
      {/* {level !== 0 && <TimelineConnector className="!w-[78px]" />} */}
      <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
        <TimelineIcon className="p-3" variant="ghost" color={color}>
          {statusIcon}
        </TimelineIcon>
        <div className="flex flex-col gap-1">
          <Typography variant="h6" color={color} style={{ opacity: "0.6" }}>
            Your order is {text}
          </Typography>
          <Typography variant="small" color="gray" className="font-normal">
            {formatdate_updatedAt}
          </Typography>
        </div>
      </TimelineHeader>
    </TimelineItem>
  );

  // render the TimeLineItem according to the current delivery status
  const switchOrderStatus = (orderStatus) => {
    switch (orderStatus) {
      case 'pending':
        return {
          text: "pending",
          level: 1,
          statusIcon: <ArrowPathRoundedSquareIcon strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" /> 
          ,
          color: "purple"
        };
      case 'accepted':
        return {
          text: "being packed",
          level: 2,
          statusIcon: <ArchiveBoxIcon strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" />

          ,
          color: "blue",
        };
      case 'dispatched':
        return {
          text: "dispatched",
          level: 3,
          statusIcon: <AdjustmentsVerticalIcon strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" />
          ,
          color: "orange",
        };
      case 'onTheWay':
        return {
          text: "on the way",
          level: 4,
          statusIcon: <TruckIcon strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" />
          ,
          color: "red",
        };
      case 'delivered':
        return {
          text: "delivered",
          level: 5,
          statusIcon: <CheckBadgeIcon strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" />
          ,
          color: "green",
        };
      case 'cancelled':
        return {
          text: "cancelled",
          level: 0,
          statusIcon: <XCircleIcon strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" />
          ,
          color: "red",
        };
      default:
        return {
          text: "pending",
          statusIcon: <ArrowPathRoundedSquareIcon strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" /> 
          ,
          color: "purple"
        };
    }
  };


  const { text, level, statusIcon, color } = switchOrderStatus(trackedOrderSuccess?.status);

  const generateTimelineItems = () => {
    const statuses = ['pending', 'accepted', 'dispatched', 'onTheWay', 'delivered', 'cancelled'];
    const currentStatusIndex = statuses.indexOf(trackedOrderSuccess?.status);

    if (currentStatusIndex === -1) {
      return [];
    }

    if (currentStatusIndex == 5) {
      return renderTimelineItem(text, level, statusIcon, color)
    }

    return statuses.slice(0, currentStatusIndex + 1).map((status, index) => {
      const { text, level, statusIcon, color } = switchOrderStatus(status);
      return (
        <AttentionSeeker key={index} effect="shake">
          {renderTimelineItem(text, level, statusIcon, color)}
        </AttentionSeeker>
      );
    });
  };



  return (
    <>
      {trackedOrderSuccess && (
        <Fade delay={1000}  triggerOnce={true}>
          <div className="track-orderDetail border rounded shadow-xl mt-10 py-10 px-5 ">
            <div className="flex">

              <Link to={`/products/${trackedOrderSuccess.id}`}><img className="w-32 rounded" src={trackedOrderSuccess.currentBuyNowProduct.thumbnail} alt={trackedOrderSuccess.currentBuyNowProduct.title} /></Link>

              <div className="flex flex-col ml-6 mr-4 text-sm md:text-lg">
                <Link to={`/products/${trackedOrderSuccess.id}`}><span className="title">{trackedOrderSuccess.currentBuyNowProduct.title} </span> </Link>
                <span className="brand">{trackedOrderSuccess.currentBuyNowProduct.brand}</span>
                <div className="flex mt-2 text-sm" >
                  <p className=""><span className="bold">Size</span>:  {trackedOrderSuccess.currentBuyNowProduct.selectedSize}</p>
                  <p className="ml-4"><span className="bold">Quantity</span>: {trackedOrderSuccess.currentBuyNowProduct.quantity}</p>
                </div>
                <p className="text-sm mt-2 "><span className="text-blue-400">Amount: </span> ₹{trackedOrderSuccess.totalAmount}</p>
              </div>

            </div>
            <p className="text-sm mt-7"><span className="text-orange-400">Ordered On:  </span> {formatdate_createdAt}</p>
            <p className="text-sm mt-2"><span className="text-blue-400">OrderID:  </span> {trackedOrderSuccess.orderId}</p>
          </div>
        </Fade>
      )
      }


      <div className="deliveryTimeline grid place-items-center mt-10">
        <div className="md:w-[25rem] ">

          {/* ### if level is 0 i.e. cancelled just display the single TimeLineItem which is 'cancelled' */}
          {/* ### if level is non zero then display the TimeLineItems according to that level of delivery satus*/}
          <Timeline>
            {trackedOrderFailed ? (
              <div className="text-red-400">{trackedOrderFailed.error}</div>
            ) : trackedOrderSuccess ? (

              <Timeline>{generateTimelineItems()}</Timeline>
            ) : null}
          </Timeline>

        </div>
      </div>
    </>
  );
}