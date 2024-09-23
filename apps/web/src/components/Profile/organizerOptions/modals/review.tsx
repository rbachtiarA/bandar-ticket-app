import { IDashboardEvent } from "@/type/dashboard";

interface ReviewModalProps {
    selectedEvent: IDashboardEvent; 
    setModal: (isOpen: boolean) => void;
}

export default function ReviewModals({ selectedEvent, setModal }: ReviewModalProps) {
    return(
        <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="modal modal-open">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">
                      Reviews for {selectedEvent.name}
                    </h3>
                    <div className="p-4 max-h-[20rem] overflow-y-scroll">
                      {selectedEvent.Review && selectedEvent.Review.length > 0 ? (
                        selectedEvent.Review.map((review, index) => (
                          <div
                            key={index}
                            className="border-y-2 mt-2 pt-2 flex flex-col justify-evenly"
                          >
                            <div className='mb-4'>
                              <div>Comment:</div>
                              <div>{review.review}</div>
                            </div>
                            <div className="flex flex-row justify-between text-sm">
                              <div>
                                <div>Rating: {review.rating}</div>
                              </div>
                              <div>
                                <div>Customer: {review.customer.name}</div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>No reviews available.</div>
                      )}
                    </div>
                    <div className="modal-action">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="modal-backdrop"
                  onClick={() => setModal(false)}
                ></div>
              </div>
    )
}