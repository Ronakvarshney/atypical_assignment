
CREATE TABLE IF NOT EXISTS Orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(50) NOT NULL ,
    product_name VARCHAR(50) NOT NULL ,
    status VARCHAR(20) NOT NULL
      CHECK(status IN ('pending' , 'shipped' , 'delivered')),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION notify_order_change()
RETURNS TRIGGER AS $$
DECLARE
    payload JSON;
BEGIN

    IF TG_OP = 'DELETE' THEN

        payload := json_build_object(
            'operation', TG_OP,
            'id', OLD.id,
            'customer_name', OLD.customer_name,
            'product_name', OLD.product_name,
            'status', OLD.status
        );

        PERFORM pg_notify(
            'order_updates',
            payload::text
        );

        RETURN OLD;

    ELSE

        payload := json_build_object(
            'operation', TG_OP,
            'id', NEW.id,
            'customer_name', NEW.customer_name,
            'product_name', NEW.product_name,
            'status', NEW.status
        );

        PERFORM pg_notify(
            'order_updates',
            payload::text
        );

        RETURN NEW;

    END IF;

END;
$$ LANGUAGE plpgsql;


DROP TRIGGER IF EXISTS order_trigger ON Orders;

CREATE TRIGGER order_trigger
AFTER INSERT OR UPDATE OR DELETE
ON Orders
FOR EACH ROW 
EXECUTE FUNCTION notify_order_change();